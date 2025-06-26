export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="h-16 w-full bg-dark2 text-green text-sm flex items-center px-4 md:px-8">
      © {year} Digital Money House
    </footer>
  );
}
