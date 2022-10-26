import React, { useState } from 'react'

export const CategoriesContext = React.createContext()

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState()
  const [files, setFiles] = useState()

  const addFiles = (data) => {
    const newFiles = data
    const list = files.map(item => {
      if (item._id !== newFiles[0].category_id) {
        return item
      } else {
        const fileList = item.files
        newFiles.forEach(newFile => {
          fileList.push(newFile)
        })
        return item
      }
    })
    setFiles(list)
  }

  const addCategory = (category) => {
    const list = [...categories]
    list.push(category.data.category)
    const fileList = [...files]
    fileList.push(category.data.category)
    setCategories(list)
    setFiles(fileList)
  }

  const updateCategory = (data) => {
    const category = data?.data?.category || { _id: '', name: '' }
    let list = categories.map(item => item._id === category._id ? category : item)
    setCategories(list)
    list = []
    list = files.map(item => item._id === category._id ? category : item)
    setFiles(list)
  }

  const deleteCategory = (category) => {
    let list = categories.map(item => item._id !== category._id ? item : null)
    setCategories(list)
    list = []
    list = files.map(item => item._id !== category._id ? item : null)
    setFiles(list)
  }

  return (
    <CategoriesContext.Provider value={{ files, setFiles, categories, addCategory, updateCategory, deleteCategory, setCategories, addFiles }}>
      {children}
    </CategoriesContext.Provider>
  )
}
