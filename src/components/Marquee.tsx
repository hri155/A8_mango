const messages = [
  "New Arrivals: The Midnight Library",
  "Special Discount on Memberships — Join Today!",
  "New Arrivals: Atomic Habits",
  "Free Shipping on All Digital Borrows",
  "New Arrivals: Sapiens",
  "Weekend Reading Challenge — Win Rewards!",
];

export default function Marquee() {
  const text = messages.join("  |  ");

  return (
    <div className="bg-primary text-primary-content py-3 overflow-hidden">
      <div className="marquee-track whitespace-nowrap">
        <span className="marquee-content text-sm font-medium tracking-wide">
          {text}  |  {text}
        </span>
      </div>
    </div>
  );
}
