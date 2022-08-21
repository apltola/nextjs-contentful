import AppHeader from './appHeader';
import Meta from './meta';

function Layout({ children, ...props }) {
  return (
    <div className="min-h-screen">
      <Meta {...props} />

      <div className="relative app-container text-musta">
        <AppHeader />
        <main className="pt-16">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
