export const generateLorem = (numParagrafos: number): string => {
  const paragrafoLorem = `Lorem ipsum dolor sit amet consectetur adipiscing elit, laoreet a augue nascetur faucibus pharetra, turpis id dictumst platea inceptos fermentum. Litora luctus lorem bibendum himenaeos pulvinar nec ullamcorper velit, vulputate in sapien inceptos platea parturient etiam vel, fermentum est consequat arcu scelerisque commodo ipsum. `;
  const arrayParagrafos: string[] = [];

  for (let i = 0; i < numParagrafos; i++) {
    arrayParagrafos.push(`<p>${paragrafoLorem}</p>`);
  }

  return arrayParagrafos.join('\n'); 
};