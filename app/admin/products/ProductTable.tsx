"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Edit2,
  Trash2,
  ExternalLink,
  Database,
  Terminal,
  MessageCircle,
  Copy,
  Check,
  Layers,
  Globe,
  Lock,
  Search,
  Plus,
} from "lucide-react";
import { deleteProduct } from "@/app/actions/cms";
import { Product } from "@/lib/types";
import { toast } from "sonner";

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "public" | "exclusive">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "public" && !product.is_private) ||
      (activeTab === "exclusive" && product.is_private);

    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.categories?.name &&
        product.categories.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  const handleDelete = async (id: string, name: string) => {
    if (!id || id.length < 10) {
      toast.info("Local fallback item", {
        description: "These are system fallbacks and can be overridden by adding database products.",
      });
      return;
    }

    toast.warning(`Delete "${name}"?`, {
      action: {
        label: "Delete",
        onClick: async () => {
          setIsDeleting(id);
          const result = await deleteProduct(id);
          if (result.error) {
            toast.error("Error", { description: result.error });
          } else {
            toast.success("Product deleted successfully");
          }
          setIsDeleting(null);
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Search & Tabs Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#EAE8E2] shadow-xs">
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-[#F7F4F0] p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
              activeTab === "all"
                ? "bg-white text-[#1C130D] shadow-xs"
                : "text-[#7A6E65] hover:text-[#1C130D]"
            }`}
          >
            <Layers size={13} />
            <span>All ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("public")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
              activeTab === "public"
                ? "bg-white text-[#1C130D] shadow-xs"
                : "text-[#7A6E65] hover:text-[#1C130D]"
            }`}
          >
            <Globe size={13} />
            <span>Public ({products.filter((p) => !p.is_private).length})</span>
          </button>
          <button
            onClick={() => setActiveTab("exclusive")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
              activeTab === "exclusive"
                ? "bg-white text-[#8A572A] shadow-xs"
                : "text-[#7A6E65] hover:text-[#8A572A]"
            }`}
          >
            <Lock size={13} />
            <span>Exclusive ({products.filter((p) => p.is_private).length})</span>
          </button>
        </div>

        {/* Search & Add */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FBFBF9] border border-[#E0DACE] rounded-lg focus:outline-none focus:border-[#8A572A]"
            />
          </div>

          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#8A572A] hover:bg-[#1C130D] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs shrink-0"
          >
            <Plus size={14} />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-[#EAE8E2] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#EAE8E2] bg-[#FAF9F6]">
                <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#7A6E65]">
                  Product Piece
                </th>
                <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#7A6E65]">
                  Category / Room
                </th>
                <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#7A6E65]">
                  Badges
                </th>
                <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#7A6E65]">
                  Source
                </th>
                <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#7A6E65] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE6]">
              {filteredProducts.map((product, i) => {
                const isLocal = !product.id || product.id === product.slug;

                return (
                  <tr
                    key={product.id || i}
                    className={`hover:bg-[#FAF9F6] transition-colors ${
                      isDeleting === product.id ? "opacity-30" : ""
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 bg-[#F7F4F0] rounded-lg overflow-hidden border border-[#EAE8E2] shrink-0 relative">
                          {product.images?.[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#8A572A] font-bold text-[9px] uppercase tracking-wider">
                              No Img
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-[#1C130D] truncate max-w-[220px]">
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-[#7A6E65] truncate max-w-[180px] font-mono mt-0.5">
                            /{product.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C130D] bg-[#F7F4F0] border border-[#EAE8E2] px-2.5 py-1 rounded-md whitespace-nowrap">
                        {product.categories?.name || product.room || "Solid Teak"}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {product.is_featured && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#8A572A] text-white rounded-md">
                            ★ Featured
                          </span>
                        )}
                        {product.is_bestseller && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#1C130D] text-white rounded-md">
                            Bestseller
                          </span>
                        )}
                        {product.is_new && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                            New
                          </span>
                        )}
                        {product.is_private && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-md">
                            Private VIP
                          </span>
                        )}
                        {!product.is_featured &&
                          !product.is_bestseller &&
                          !product.is_new &&
                          !product.is_private && (
                            <span className="text-[10px] text-[#AAAAAA]">—</span>
                          )}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                          isLocal
                            ? "bg-[#F7F4F0] text-[#7A6E65] border border-[#EAE8E2]"
                            : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        }`}
                      >
                        {isLocal ? <Terminal size={11} /> : <Database size={11} />}
                        <span>{isLocal ? "System Default" : "Supabase DB"}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={
                            product.is_private
                              ? `/exclusive/${product.access_token}`
                              : `/products/${product.slug}`
                          }
                          target="_blank"
                          className="p-1.5 text-[#7A6E65] hover:text-[#8A572A] hover:bg-[#F7F4F0] rounded-md transition-colors"
                          title="View on site"
                        >
                          <ExternalLink size={15} />
                        </Link>

                        {product.is_private && (
                          <button
                            onClick={() => {
                              const link = `${baseUrl}/exclusive/${product.access_token}`;
                              navigator.clipboard.writeText(link);
                              setCopiedId(product.id);
                              toast.success("Secret Link Copied!");
                              setTimeout(() => setCopiedId(null), 2000);
                            }}
                            className="p-1.5 text-[#7A6E65] hover:text-[#8A572A] hover:bg-[#F7F4F0] rounded-md transition-colors"
                            title="Copy Secret Link"
                          >
                            {copiedId === product.id ? (
                              <Check size={15} className="text-emerald-600" />
                            ) : (
                              <Copy size={15} />
                            )}
                          </button>
                        )}

                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-1.5 text-[#7A6E65] hover:text-[#1C130D] hover:bg-[#F7F4F0] rounded-md transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 size={15} />
                        </Link>

                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={isDeleting === product.id}
                          className="p-1.5 text-[#7A6E65] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                          title="Delete Product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-[#999999]">
              No products found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
