'use client';

import { useEffect } from 'react';

type ShopifyBuyWindow = {
  ShopifyBuy: {
    buildClient: (config: {
      domain: string;
      storefrontAccessToken: string;
    }) => unknown;
    UI: {
      onReady: (client: unknown) => Promise<{
        createComponent: (
          type: string,
          config: {
            id: string;
            node: HTMLElement | null;
            moneyFormat: string;
            options: Record<string, unknown>;
          }
        ) => void;
      }>;
    };
  };
};

export default function BuyButton({ productId }: { productId: string }) {
  useEffect(() => {
    const scriptURL =
      'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    function ShopifyBuyInit() {
      const win = window as unknown as Partial<ShopifyBuyWindow>;

      if (!win.ShopifyBuy) return;

      const client = win.ShopifyBuy.buildClient({
        domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!,
        storefrontAccessToken:
          process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
      });

      win.ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent('product', {
          id: productId,
          node: document.getElementById(
            `product-component-${productId}`
          ),
          moneyFormat: '%24%7B%7Bamount%7D%7D',

          options: {
            product: {
              styles: {
                imgWrapper: {
                  height: '350px',
                  width: '200px',
                  overflow: 'hidden',
                  margin: '0 auto',
                },
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': 'calc(25% - 20px)',
                    'margin-left': '20px',
                    'margin-bottom': '50px',
                  },
                },
                title: {
                  'font-family': 'Roboto, sans-serif',
                  'font-weight': 'normal',
                  color: '#000000',
                },
                button: {
                  'font-family': 'Roboto, sans-serif',
                  'font-size': '14px',
                  'padding-top': '15px',
                  'padding-bottom': '15px',
                  ':hover': {
                    'background-color': '#000000',
                  },
                  'background-color': '#000000',
                  ':focus': {
                    'background-color': '#000000',
                  },
                  'border-radius': '5px',
                },
                quantityInput: {
                  'font-size': '14px',
                  'padding-top': '15px',
                  'padding-bottom': '15px',
                },
                price: {
                  'font-family': 'Roboto, sans-serif',
                  color: '#000000',
                },
                compareAt: {
                  'font-family': 'Roboto, sans-serif',
                  color: '#000000',
                },
                unitPrice: {
                  'font-family': 'Roboto, sans-serif',
                  color: '#000000',
                },
              },
              buttonDestination: 'modal',
              contents: {
                img: true,
                imgWithCarousel: false,
                options: false,
              },
              text: {
                button: 'View product',
              },
              googleFonts: ['Roboto'],
            },

            productSet: {
              styles: {
                products: {
                  '@media (min-width: 601px)': {
                    'margin-left': '-20px',
                  },
                },
              },
            },

            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0px',
                    'margin-bottom': '0px',
                  },
                },
                button: {
                  'font-family': 'Roboto, sans-serif',
                  'font-size': '14px',
                  'padding-top': '15px',
                  'padding-bottom': '15px',
                  ':hover': {
                    'background-color': '#000000',
                  },
                  'background-color': '#000000',
                  ':focus': {
                    'background-color': '#000000',
                  },
                  'border-radius': '5px',
                },
                quantityInput: {
                  'font-size': '14px',
                  'padding-top': '15px',
                  'padding-bottom': '15px',
                },
                title: {
                  'font-family': 'Helvetica Neue, sans-serif',
                  'font-weight': 'bold',
                  'font-size': '26px',
                  'color': '#4c4c4c',
                },
                price: {
                  'font-family': 'Helvetica Neue, sans-serif',
                  'font-weight': 'normal',
                  'font-size': '18px',
                  'color': '#4c4c4c',
                },
                compareAt: {
                  'font-family': 'Helvetica Neue, sans-serif',
                  'font-weight': 'normal',
                  'font-size': '15.299999999999999px',
                  'color': '#4c4c4c',
                },
                unitPrice: {
                  'font-family': 'Helvetica Neue, sans-serif',
                  'font-weight': 'normal',
                  'font-size': '15.299999999999999px',
                  'color': '#4c4c4c',
                },
              },
              googleFonts: ['Roboto'],
              text: {
                button: 'Add to cart',
              },
            },

            option: {
              googleFonts: ['Roboto'],
            },

            cart: {
              popup: false,
              styles: {
                button: {
                  'font-family': 'Roboto, sans-serif',
                  'font-size': '14px',
                  'padding-top': '15px',
                  'padding-bottom': '15px',
                  ':hover': {
                    'background-color': '#000000',
                  },
                  'background-color': '#000000',
                  ':focus': {
                    'background-color': '#000000',
                  },
                  'border-radius': '5px',
                },
                title: { color: '#000000' },
                header: { color: '#000000' },
                lineItems: { color: '#000000' },
                subtotalText: { color: '#000000' },
                subtotal: { color: '#000000' },
                notice: { color: '#000000' },
                currency: { color: '#000000' },
                close: {
                  color: '#000000',
                  ':hover': { color: '#000000' },
                },
                empty: { color: '#000000' },
                noteDescription: { color: '#000000' },
                discountText: { color: '#000000' },
                discountIcon: { fill: '#000000' },
                discountAmount: { color: '#000000' },
              },
              text: {
                total: 'Subtotal',
                button: 'Checkout',
              },
              googleFonts: ['Roboto'],
            },

            toggle: {
              styles: {
                toggle: {
                  'font-family': 'Roboto, sans-serif',
                  'background-color': '#000000',
                  ':hover': { 'background-color': '#000000' },
                  ':focus': { 'background-color': '#000000' },
                },
                count: { 'font-size': '14px' },
              },
              googleFonts: ['Roboto'],
            },

            lineItem: {
              styles: {
                variantTitle: { color: '#000000' },
                title: { color: '#000000' },
                price: { color: '#000000' },
                fullPrice: { color: '#000000' },
                discount: { color: '#000000' },
                discountIcon: { fill: '#000000' },
                quantity: { color: '#000000' },
                quantityIncrement: {
                  color: '#000000',
                  'border-color': '#000000',
                },
                quantityDecrement: {
                  color: '#000000',
                  'border-color': '#000000',
                },
                quantityInput: {
                  color: '#000000',
                  'border-color': '#000000',
                },
              },
            },
          },
        });
      });
    }

    function loadScript() {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      document.head.appendChild(script);
      script.onload = ShopifyBuyInit;
    }

    const win = window as unknown as Partial<ShopifyBuyWindow>;

    if (win.ShopifyBuy?.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  }, [productId]);

  return <div id={`product-component-${productId}`} />;
}