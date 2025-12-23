export default function Footer() {
  return (
    <footer className="mt-auto py-3">
      <div className="mt-auto text-center text-[.8rem] tracking-wide text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Smart AquaFeed Pro All rights reserved
      </div>
    </footer>
  );
}
