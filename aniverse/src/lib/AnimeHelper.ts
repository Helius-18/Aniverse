// lib/consumet.ts
export const getHomeDetails = async () => {
  try {
    const response = await fetch(`/api/getHomeDetails`);
    if (!response.ok) {
      throw new Error("Failed to fetch anime data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching anime:", error);
    return [];
  }
};


export const searchAnime = async (query: string, page = 0) => {
    try {
      const response = await fetch(`/api/searchAnime?query=${query}&page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch anime data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching anime:", error);
      return [];
    }
};
  

export const getAnimeDetails = async (query: string) => {
    try {
      const response = await fetch(`/api/getAnimeDetails?query=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch anime data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching anime:", error);
      return [];
    }
};


export const getEpisodes = async (query: string) => {
  try {
    const response = await fetch(`/api/getEpisodes?query=${query}`);
    if (!response.ok) {
      throw new Error("Failed to fetch anime data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching anime:", error);
    return [];
  }
};


export const getEpisodeDetails = async (query: string) => {
    try {
      const response = await fetch(`/api/getEpisodeDetails?query=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch anime data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching anime:", error);
      return [];
    }
};