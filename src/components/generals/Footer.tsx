export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="h-10 w-full bg-dark2 text-green text-sm flex items-center justify-center md:justify-start px-4 md:px-8">
      © {year} Digital Money House
    </footer>
  );
}
