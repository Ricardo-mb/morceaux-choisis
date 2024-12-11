export function Footer() {
  return (
    <footer className='mt-16 bg-secondary py-8 text-secondary-foreground'>
      <div className='container mx-auto px-4 text-center'>
        <p>&copy; {new Date().getFullYear()} MBK. All rights reserved.</p>
      </div>
    </footer>
  );
}
