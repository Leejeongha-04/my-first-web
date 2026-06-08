DROP POLICY IF EXISTS "Allow users to insert their own profile" ON profiles;

CREATE POLICY "Allow users to insert their own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

