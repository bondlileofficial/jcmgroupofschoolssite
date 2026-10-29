exports.handler = async () => {
  const url = process.env.SUPABASE_DATABASE_URL || process.env.SUPABASE_URL || '';
  const anonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
    body: JSON.stringify({ url, anonKey }),
  };
};
