interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="p-8 flex flex-col items-center justify-center gap-2">
      {children}
    </div>
  );
};

export default Layout;
