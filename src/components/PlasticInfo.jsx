import React from "react";

const plastics = [
  {
    id: 1,
    name: "PET (Polyethylene Terephthalate)",
    symbol: "♳",
    examples: "Water bottles, soft drink bottles, food containers, polyester clothing",
    recyclability: "Highly recyclable; used for new bottles and fabrics.",
    image: "https://d3hjf51r9j54j7.cloudfront.net/wp-content/uploads/sites/7/2015/12/PET-bottles2.jpg",
  },
  {
    id: 2,
    name: "HDPE (High-Density Polyethylene)",
    symbol: "♴",
    examples: "Milk jugs, shampoo bottles, detergent bottles, plastic bags",
    recyclability: "Widely recycled; used in new containers, pipes, and plastic lumber.",
    image: "https://everydayrecycler.com/wp-content/uploads/2020/02/plastic-number-2-main.jpg",
  },
  {
    id: 3,
    name: "PVC (Polyvinyl Chloride)",
    symbol: "♵",
    examples: "Pipes, medical tubing, window frames, vinyl flooring",
    recyclability: "Difficult to recycle; limited reuse due to toxic chemicals.",
    image: "https://5.imimg.com/data5/SELLER/Default/2024/3/401458503/VC/WE/AF/16147040/plumbing-pipes-and-fittings-500x500.jpg",
  },
  {
    id: 4,
    name: "LDPE (Low-Density Polyethylene)",
    symbol: "♶",
    examples: "Plastic bags, cling wraps, squeeze bottles, bubble wrap",
    recyclability: "Some recycling programs accept it, often repurposed into trash bags and furniture.",
    image: "https://cdn1.vogel.de/BbuSUaNc0Ukyj6drs9iQdoMFALk=/fit-in/800x0/p7i.vogel.de/wcms/7e/ec/7eecb5b059a1f73355a54bbdf1f4fc41/0116457646.jpeg",
  },
  {
    id: 5,
    name: "PP (Polypropylene)",
    symbol: "♷",
    examples: "Food containers, bottle caps, straws, takeout boxes",
    recyclability: "Recyclable but less common; used for automotive parts and storage containers.",
    image: "https://exirpolymer.com/wp-content/uploads/2023/12/polypropylene-examples.jpg",
  },
  {
    id: 6,
    name: "PS (Polystyrene)",
    symbol: "♸",
    examples: "Styrofoam cups, food trays, disposable cutlery, packing peanuts",
    recyclability: "Difficult to recycle; mostly ends up in landfills or as pollution.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuaDX4Q6Gsv4pWBEZSntR5FNyQVhqbd4qBxGqITGJ79T3ek69TGngZ0CYiyAlpLWtnz6o&usqp=CAU",
  },
];

const PlasticInfo = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>♻️ Types of Plastics & Their Recyclability</h1>
      <div style={styles.grid}>
        {plastics.map((plastic) => (
          <div key={plastic.id} style={styles.card}>
            <img src={plastic.image} alt={plastic.name} style={styles.image} />
            <h2 style={styles.plasticName}>
              {plastic.symbol} {plastic.name}
            </h2>
            <p style={styles.text}>
              <strong>Examples:</strong> {plastic.examples}
            </p>
            <p style={styles.recyclability}>
              <strong>Recyclability:</strong> {plastic.recyclability}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "20px auto",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "2px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    backgroundColor: "#fff",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  image: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginBottom: "10px",
  },
  plasticName: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "5px 0",
  },
  text: {
    fontSize: "14px",
    color: "#555",
    margin: "5px 0",
  },
  recyclability: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "green",
    margin: "10px 0 0",
  },
};

export default PlasticInfo;
