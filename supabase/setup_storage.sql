-- Create the nilambur-media bucket
insert into storage.buckets (id, name, public) 
values ('nilambur-media', 'nilambur-media', true)
on conflict do nothing;

-- Allow public read access
create policy "Public Access" 
on storage.objects for select 
using ( bucket_id = 'nilambur-media' );

-- Allow authenticated admins to upload/modify
create policy "Auth Admin Upload/Modify/Delete" 
on storage.objects for all 
using ( bucket_id = 'nilambur-media' and auth.role() = 'authenticated' );
