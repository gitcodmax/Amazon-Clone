import { Product, Clothing, Appliance } from "../../data/products.js"

describe("test suite: Product, Clothing and Appliance classes", () => {

  it("Tests the Product class", () => {
    const product1 = new Product(  {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    });

    expect(
      product1.name
    ).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
    expect(
      product1.rating
    ).toEqual( {
      stars: 4.5,
      count: 87
    });
    expect(
      product1.getStarsUrl()
    ).toEqual(`images/ratings/rating-${product1.rating.stars * 10}.png`);
  });

  it("Tests the Clothing class", () => {
    const product1 = new Clothing(  
      {
        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
        name: "Adults Plain Cotton T-Shirt - 2 Pack",
        rating: {
          stars: 4.5,
          count: 56
        },
        priceCents: 799,
        keywords: [
          "tshirts",
          "apparel",
          "mens"
        ],
        type: "clothing",
        sizeChartLink: "images/clothing-size-chart.png"
      }    
    )
    expect(
      product1.name
    ).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
    expect(
      product1.priceCents
    ).toEqual(799);
    expect(
      product1.extraInfoHTML()
    ).toEqual(`
    <a href="${product1.sizeChartLink}" target="_blank">
      Size chart
    </a>
    `)
  })

  it("Tests the Appliance class", () => {
    const product1 = new Appliance(  
      {
        id: "54e0eccd-8f36-462b-b68a-8182611d9add",
        image: "images/products/black-2-slot-toaster.jpg",
        name: "2 Slot Toaster - Black",
        rating: {
          stars: 5,
          count: 2197
        },
        priceCents: 1899,
        type: "appliance",
        instructionsLink: "images/appliance-instructions.png", 
        warrantyLink: "images/appliance-warranty.png",
        keywords: [
          "toaster",
          "kitchen",
          "appliances"
        ]
      }    
    )
    expect(
      product1.name
    ).toEqual("2 Slot Toaster - Black");
    expect(
      product1.priceCents
    ).toEqual(1899);
    expect(
      product1.priceCents
    ).toEqual(1899);
    expect(
      product1.extraInfoHTML()
    ).toContain(product1.instructionsLink)
  })
})