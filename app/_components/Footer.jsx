export default function Footer() {
  return (
    <footer className="mt-auto py-3">
      <div className="text-center text-[.8rem] tracking-wide text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Smart AquaFeed Pro <br />
        All rights reserved
      </div>
    </footer>
  );
}
