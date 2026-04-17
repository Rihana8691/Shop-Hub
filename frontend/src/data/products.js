const products = [
  // Electronics
  {
    id: 1,
    name: "Wireless Headphones",
    price: 4500, // ETB
    category: "Electronics",
    description: "Premium noise-cancelling headphones with 30-hour battery life and comfortable over-ear design. Perfect for travel and daily use.",
    stock: 15,
    image: "https://images.unsplash.com/photo-1612465289702-7c84b5258fde?w=400&h=300&fit=crop"
    /*src="https://images.unsplash.com/photo-1612465289702-7c84b5258fde?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" */
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 6500, // ETB
    category: "Electronics",
    description: "RGB mechanical keyboard with blue switches, programmable keys, and detachable wrist rest. Ideal for gaming and typing.",
    stock: 8,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 11200, // ETB
    category: "Electronics",
    description: "Fitness tracker smartwatch with heart rate monitor, GPS, and 7-day battery life. Track your health and stay connected.",
    stock: 5,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
  },
  {
    id: 4,
    name: "Laptop Stand",
    price: 1200, // ETB
    category: "Electronics",
    description: "Adjustable aluminum laptop stand for better ergonomics and cooling. Compatible with all laptop sizes.",
    stock: 20,
    image: "https://images.unsplash.com/photo-1623251606108-512c7c4a3507?w=300&h=200&fit=crop"
  },
  {
    id: 5,
    name: "USB-C Hub",
    price: 1800, // ETB
    category: "Electronics",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and 100W power delivery. Perfect for modern laptops.",
    stock: 12,
    image: "https://images.unsplash.com/photo-1616578273461-3a99ce422de6?w=300&h=200&fit=crop"
    /*https://images.unsplash.com/photo-1616578273461-3a99ce422de6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D */
  },
  {
    id: 6,
    name: "Wireless Mouse",
    price: 850, // ETB
    category: "Electronics",
    description: "Ergonomic wireless mouse with precision tracking and long battery life. Comfortable for all-day use.",
    stock: 25,
    image: "https://images.unsplash.com/photo-1662323861979-0538474387e3?w=300&h=200&fit=crop"

   
    /*Photo by <a href="https://unsplash.com/@starworshipp3r?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Star</a> on <a href="https://unsplash.com/photos/a-black-computer-mouse-ePGW9e_gcz8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      */
  },
  {
    id: 7,
    name: "Phone Case",
    price: 350, // ETB
    category: "Electronics",
    description: "Protective phone case with kickstand and screen protector. Shock-resistant design for maximum protection.",
    stock: 40,
    image: "https://images.unsplash.com/photo-1623393937972-4b3102ba8c23?w=300&h=200&fit=crop"
    /*src="https://images.unsplash.com/photo-1623393937972-4b3102ba8c23?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" */
  },
  {
    id: 8,
    name: "Power Bank",
    price: 2200, // ETB
    category: "Electronics",
    description: "20000mAh portable power bank with fast charging. Multiple ports for charging several devices simultaneously.",
    stock: 18,
    image: "https://images.unsplash.com/photo-1706275400998-7fc21c8cd8ed?w=300&h=200&fit=crop"
  },
 
  // Clothing
  {
    id: 9,
    name: "Cotton T-Shirt",
    price: 1400, // ETB
    category: "Clothing",
    description: "100% organic cotton t-shirt, breathable and comfortable. Available in multiple sizes and colors.",
    stock: 50,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop"
  },
  {
    id: 10,
    name: "Denim Jeans",
    price: 3400, // ETB
    category: "Clothing",
    description: "Classic fit denim jeans with stretch comfort. Durable fabric perfect for everyday wear.",
    stock: 30,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=200&fit=crop"
  },
  {
    id: 11,
    name: "Winter Jacket",
    price: 8500, // ETB
    category: "Clothing",
    description: "Water-resistant winter jacket with thermal insulation. Perfect for cold weather activities.",
    stock: 18,
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=300&h=200&fit=crop"
  },
  {
    id: 12,
    name: "Sports Shoes",
    price: 2800, // ETB
    category: "Clothing",
    description: "Comfortable running shoes with excellent cushioning and support. Perfect for sports and daily wear.",
    stock: 22,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop"
  },
  {
    id: 13,
    name: "Leather Belt",
    price: 1800, // ETB
    category: "Clothing",
    description: "Genuine leather belt with classic buckle. Durable and stylish accessory for any outfit.",
    stock: 35,
    image: "https://images.unsplash.com/photo-1711443982852-b3df5c563448?w=300&h=200&fit=crop"
    /*https://images.unsplash.com/photo-1711443982852-b3df5c563448?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D */
  },
  {
    id: 14,
    name: "Wool Sweater",
    price: 4200, // ETB
    category: "Clothing",
    description: "Cozy wool sweater perfect for cold weather. Soft, warm, and stylish for any occasion.",
    stock: 15,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=200&fit=crop"
  },
  {
    id: 15,
    name: "Baseball Cap",
    price: 650, // ETB
    category: "Clothing",
    description: "Classic baseball cap with adjustable strap. Stylish accessory for casual wear.",
    stock: 45,
    image: "https://images.unsplash.com/photo-1586622977567-bc45e4ae72fe?w=300&h=200"
  },
  {
    id: 16,
    name: "Backpack",
    price: 3500, // ETB
    category: "Clothing",
    description: "Durable backpack with multiple compartments. Perfect for school, work, or travel.",
    stock: 28,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200"/*&fit=crop*/
  },
 
  // Home & Kitchen
  {
    id: 17,
    name: "Coffee Maker",
    price: 5100, // ETB
    category: "Home",
    description: "12-cup programmable coffee maker with auto-brew feature and thermal carafe. Brew your perfect cup every morning.",
    stock: 12,
    image: "https://images.unsplash.com/photo-1608354580875-30bd4168b351?w=300&h=200&fit=crop"
    /*https://images.unsplash.com/photo-1608354580875-30bd4168b351?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D */
  },
  {
    id: 18,
    name: "Desk Lamp",
    price: 2000, // ETB
    category: "Home",
    description: "LED desk lamp with adjustable brightness and color temperature. Energy-efficient with USB charging port.",
    stock: 25,
    image: "https://plus.unsplash.com/premium_photo-1685287731216-a7a0fae7a41a?w=300&h=200&fit=crop"
    /*https://plus.unsplash.com/premium_photo-1685287731216-a7a0fae7a41a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D */
  },
  {
    id: 19,
    name: "Blender",
    price: 3800, // ETB
    category: "Home",
    description: "High-speed blender perfect for smoothies, soups, and sauces. Easy to clean and durable construction.",
    stock: 10,
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&h=200&fit=crop"
  },
  {
    id: 20,
    name: "Kitchen Knife Set",
    price: 4500, // ETB
    category: "Home",
    description: "Professional knife set with wooden block. Includes chef knife, bread knife, and utility knives.",
    stock: 8,
    image: "https://plus.unsplash.com/premium_photo-1680382578850-4358e21515fb?w=300&h=200&fit=crop"

    /*src="https://plus.unsplash.com/premium_photo-1680382578850-4358e21515fb?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D*/
   }, {
    id: 21,
    name: "Cutting Board",
    price: 1200, // ETB
    category: "Home",
    description: "Bamboo cutting board with juice groove. Eco-friendly and durable for all your chopping needs.",
    stock: 30,
    image: "https://plus.unsplash.com/premium_photo-1714702846875-ca3a149c0592?w=300&h=200&fit=crop"
    /*
    src="https://plus.unsplash.com/premium_photo-1714702846875-ca3a149c0592?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" */
  },
  {
    id: 22,
    name: "Wall Clock",
    price: 1800, // ETB
    category: "Home",
    description: "Modern wall clock with silent movement. Elegant design for any room decor.",
    stock: 20,
    image: "https://images.unsplash.com/photo-1558603655-491ecfa8324f?w=300&h=200&fit=crop"
    /*https://images.unsplash.com/photo-1558603655-491ecfa8324f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D*/
  },{
    id: 23,
    name: "Picture Frame",
    price: 850, // ETB
    category: "Home",
    description: "Wooden picture frame for 5x7 photos. Perfect for displaying your favorite memories.",
    stock: 40,
    image: "https://plus.unsplash.com/premium_photo-1677851420628-18a1242a3050?w=300&h=200&fit=crop"
    /*https://plus.unsplash.com/premium_photo-1677851420628-18a1242a3050?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D */
  },
  {
    id: 24,
    name: "Plant Pot",
    price: 650, // ETB
    category: "Home",
    description: "Ceramic plant pot with drainage hole. Perfect for indoor plants and home decoration.",
    stock: 35,
    image: "https://images.unsplash.com/photo-1563419837758-e48ef1b731dd?w=300&h=200&fit=crop"
    /*src="https://images.unsplash.com/photo-1563419837758-e48ef1b731dd?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" */
  },

  // Books & Stationery
  {
    id: 25,
    name: "Notebook Set",
    price: 850, // ETB
    category: "Books",
    description: "Set of 3 premium notebooks with pens. Perfect for journaling, note-taking, and sketching.",
    stock: 40,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop"
  },
  {
    id: 26,
    name: "Pen Set",
    price: 1200, // ETB
    category: "Books",
    description: "Professional pen set with multiple colors and styles. Perfect for office and creative work.",
    stock: 25,
    image: "https://images.unsplash.com/photo-1605641987825-c1664626d79f?w=300&h=200&fit=crop"
    /*
    src="https://images.unsplash.com/photo-1605641987825-c1664626d79f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  */
  },
  {
    id: 27,
    name: "Desk Organizer",
    price: 1800, // ETB
    category: "Books",
    description: "Bamboo desk organizer with multiple compartments. Keeps your workspace tidy and organized.",
    stock: 18,
    image: "https://plus.unsplash.com/premium_photo-1683543124517-72b9a3121771?w=300&h=200&fit=crop"
    /*src="https://plus.unsplash.com/premium_photo-1683543124517-72b9a3121771?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" */
  },
  {
    id: 28,
    name: "Bookmark Set",
    price: 350, // ETB
    category: "Books",
    description: "Elegant metal bookmark set with different designs. Perfect gift for book lovers.",
    stock: 45,
    image: "https://images.unsplash.com/photo-1709158990536-0cd97cd00345?w=300&h=200&fit=crop"
    /*https://images.unsplash.com/photo-1709158990536-0cd97cd00345?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D*/
  },
  {
    id: 29,
    name: "Highlighters",
    price: 650, // ETB
    category: "Books",
    description: "Set of 6 vibrant highlighters with chisel tip. Perfect for studying and document marking.",
    stock: 35,
    image: "https://plus.unsplash.com/premium_photo-1723744982193-7340526a0964?w=300&h=200&fit=crop"
    /*https://plus.unsplash.com/premium_photo-1723744982193-7340526a0964?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D */
  },

  // Beauty & Personal Care
  {
    id: 30,
    name: "Face Cream",
    price: 2200, // ETB
    category: "Beauty",
    description: "Moisturizing face cream with natural ingredients. Suitable for all skin types.",
    stock: 20,
    image: "https://images.unsplash.com/photo-1606424359367-af69e3da9832?w=300&h=200&fit=crop"
    /*https://images.unsplash.com/photo-1606424359367-af69e3da9832?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D */
  },
  {
    id: 31,
    name: "Shampoo Set",
    price: 2800, // ETB
    category: "Beauty",
    description: "Complete hair care set with shampoo, conditioner, and hair mask. For healthy, shiny hair.",
    stock: 15,
    image: "https://images.unsplash.com/photo-1766101067640-b3ae41ba84bd?w=300&h=200&fit=crop"
    /*src="https://images.unsplash.com/photo-1766101067640-b3ae41ba84bd?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" */
  },
  {
    id: 32,
    name: "Makeup Brushes",
    price: 3500, // ETB
    category: "Beauty",
    description: "Professional makeup brush set with 12 pieces. Perfect for flawless makeup application.",
    stock: 12,
    image: "https://images.unsplash.com/photo-1620464003286-a5b0d79f32c2?w=300&h=200&fit=crop"
    /*src="https://images.unsplash.com/photo-1620464003286-a5b0d79f32c2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" */
  },
  {
    id: 33,
    name: "Perfume",
    price: 6500, // ETB
    category: "Beauty",
    description: "Elegant perfume with long-lasting fragrance. Perfect for daily wear and special occasions.",
    stock: 8,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=300&h=200&fit=crop"
    /*https://images.unsplash.com/photo-1547887537-6158d64c35b3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D */
  },
  {
    id: 34,
    name: "Lip Balm Set",
    price: 1200, // ETB
    category: "Beauty",
    description: "Set of 3 moisturizing lip balms with different flavors. Protects and nourishes lips.",
    stock: 30,
    image: "https://images.unsplash.com/photo-1657472555611-2f30d750a846?w=300&h=200&fit=crop"
    /*src="https://images.unsplash.com/photo-1657472555611-2f30d750a846?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" */
  },

  // Office & School Projects
  {
    id: 35,
    name: "Projector",
    price: 15000, // ETB
    category: "Office",
    description: "HD projector with wireless connectivity. Perfect for presentations and home theater projects.",
    stock: 6,
    image: "https://images.unsplash.com/photo-1528395874238-34ebe249b3f2?w=300&h=200&fit=crop"
    /*https://images.unsplash.com/photo-1528395874238-34ebe249b3f2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D */
  },
  
  {
    id: 37,
    name: "Filing Cabinet",
    price: 6500, // ETB
    category: "Office",
    description: "Metal filing cabinet with 4 drawers. Perfect for document organization and office projects.",
    stock: 10,
    image: "https://plus.unsplash.com/premium_photo-1675838735598-7060d1f577f7?w=300&h=200&fit=crop"
    /*https://plus.unsplash.com/premium_photo-1675838735598-7060d1f577f7?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D */
  },
  {
    id: 38,
    name: "Office Chair",
    price: 8500, // ETB
    category: "Office",
    description: "Ergonomic office chair with lumbar support. Perfect for long working hours and projects.",
    stock: 8,
    image: "https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?w=300&h=200&fit=crop"
    /*https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D */
  },
  {
    id: 39,
    name: "Printer Paper",
    price: 1200, // ETB
    category: "Office",
    description: "Box of 500 sheets A4 printer paper. High quality for printing documents and projects.",
    stock: 50,
    image: "https://images.unsplash.com/photo-1758708536058-142d64336046?w=300&h=200&fit=crop"
    /*src="https://images.unsplash.com/photo-1758708536058-142d64336046?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" */
  },
  {
    id: 40,
    name: "Stapler Set",
    price: 850, // ETB
    category: "Office",
    description: "Heavy-duty stapler with 1000 staples. Perfect for office and school projects.",
    stock: 35,
    image: "https://plus.unsplash.com/premium_photo-1770545168536-c5e75eab5083?w=300&h=200&fit=crop"
    /*src="https://plus.unsplash.com/premium_photo-1770545168536-c5e75eab5083?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" */
  },

  {
    id: 43,
    name: "Desk Lamp",
    price: 2200, // ETB
    category: "Office",
    description: "LED desk lamp with adjustable brightness. Reduces eye strain during work.",
    stock: 25,
    image: "https://images.unsplash.com/photo-1619608135352-868e8313e121?w=300&h=200&fit=crop"
    /*https://images.unsplash.com/photo-1619608135352-868e8313e121?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D */
  }
];

export default products;