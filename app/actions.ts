'use server'

export async function getSummary(formData: FormData) {
  const url = formData.get('url');
  console.log(url);
  return { message: 'test'}
}
