import React, { useState } from 'react'

export const CategoriesContext = React.createContext()

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState()
  const [files, setFiles] = useState()

  const addCategory = (category) => {
    const list = [...categories]
    list.push(category.data.category)
    const fileList = [...files]
    fileList.push(category.data.category)
    setCategories(list)
    setFiles(fileList)
  }

  const updateCategory = (category) => {
    const list = categories.map(item => {
      if (item._id === category._id) return category
      return item
    })
    setCategories(list)
  }

  const deleteCategory = (category) => {
    let list = categories.map(item => item._id !== category._id ? item : null)
    setCategories(list)
    list = []
    list = files.map(item => item._id !== category._id ? item : null)
    setFiles(list)
  }

  return (
    <CategoriesContext.Provider value={{ files, setFiles, categories, addCategory, updateCategory, deleteCategory, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  )
}
