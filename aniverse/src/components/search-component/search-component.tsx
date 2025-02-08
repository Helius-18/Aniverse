'use client'
import { useRouter } from 'next/navigation';

const SearchComponent = () => {
    const router = useRouter();

    const searchAnime = () => {
        const searchInput = document?.getElementById('search') as HTMLInputElement;
        router.push(`/search?q=${searchInput?.value}`)
        searchInput.value = '';
    }

    return (
        <button className='btn btn-secondary' type='button' onClick={searchAnime}>Search</button>
    )
}

export default SearchComponent