import { getProducts } from "@/lib/shopify-fetch";
import BuyButton from "./BuyButton";

export default async function Home() {

  const products = await getProducts();

  const productIds: string[] = products.map((product) => product.id.split('/').pop() || '');

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {productIds.map((id, idx) => (
          <div key={id + idx}>
            <BuyButton productId={id}  />
          </div>
        ))}
      </div>

    </div>
  );
}