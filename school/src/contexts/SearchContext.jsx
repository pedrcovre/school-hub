import React, { createContext, useState, useContext } from 'react'

const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const value = {
    searchTerm,
    setSearchTerm
  }

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}

export const useSearch = () => {
  return useContext(SearchContext)
}
