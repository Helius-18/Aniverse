import '@/app/global.css'
import SearchComponent from '@/components/search-component/search-component';

export const metadata = {
  title: 'Aniverse',
  description: 'Watch anime Online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="d-flex justify-content-between align-items-center p-3">

          <div className="title">
              <h4>Aniverse</h4>
          </div>

          <div className="login-button d-flex gap-4 align-items-center">
              <div className="search">
                <input type="text" id='search' className="form-control" placeholder="search" aria-label="search" style={{ width: '40vh' }} />
              </div>
              <SearchComponent/>
          </div>

        </div>
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}
