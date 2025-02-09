"use client"
import '@/app/global.css'
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const inputRef = useRef(null) as any;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const searchAnime = () => {
    router.push(`/search?q=${searchQuery}`)
    inputRef?.current?.blur();
  }

  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  const handleBlur = () => {
    setIsSearchVisible(false);
  };

  const handleInputChange = (event: any) => {
    setSearchQuery(event?.target?.value);
  };


  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
      </head>
      <body>
        <div className="d-flex justify-content-between align-items-center p-3">

          <div className="title" style={{cursor: 'pointer'}} onClick={() => router.push(`/`)}>
            <h4>Aniverse</h4>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); searchAnime() }}>
            <div className="login-button d-flex gap-4 align-items-center">
              <div className="search">
                <input type="text" id='search' className="form-control d-md-block d-none" placeholder="search" aria-label="search" style={{ width: '40vh' }} onChange={handleInputChange} />
              </div>
              <div className={`position-relative searchContainer d-block d-md-none`}>
                <button
                  className="btn"
                  type='button'
                  onClick={handleSearchToggle}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
              <button className='btn btn-secondary d-md-block d-none' type='submit'>Search</button>
            </div>
          </form>

        </div>
        <div>
          {children}
        </div>
        {isSearchVisible && (
          <form onSubmit={(e) => { e.preventDefault(); searchAnime() }}>
            <input
              ref={inputRef}
              type="text"
              id='search'
              onChange={handleInputChange}
              className="position-absolute form-control top-0 start-50 translate-middle-x w-100 z-3 p-2 mt-2"
              placeholder="Search..."
              onBlur={handleBlur}
              autoFocus
            />
          </form>
        )}
      </body>
    </html>
  )
}
