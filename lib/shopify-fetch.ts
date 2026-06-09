export type Product = {
  id: string;
  title: string;
  description: string;
  handle: string;
  variants: {
    edges: {
      cursor: string;
      node: {
        id: string;
        title: string;
        quantityAvailable: number;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
}

export async function getProducts(){
  const query = `
  {
    products(first: 10) {
      edges {
        cursor
        node {
          id
          title
          description
          handle
          variants(first: 10) {
            edges {
              cursor
              node {
                id
                title
                quantityAvailable
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
  `

  const res = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '',
    },
    body: JSON.stringify({ query }),
  });

  const { data }: {data: { products: { edges: { cursor: string; node: Product }[] } }} = await res.json();

  return data.products.edges.map(({ node }) => node);
}