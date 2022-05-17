import React from 'react'
import PropTypes from 'prop-types'

// {
//   _id: "60666c42cc7b410027a1a9b5",
//   name: "Говяжий метеорит (отбивная)",
//   type: "main",
//   proteins: 800,
//   fat: 800,
//   carbohydrates: 300,
//   calories: 2674,
//   price: 3000,
//   image: "https://code.s3.yandex.net/react/code/meat-04.png",
//   image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
//   image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
//   __v: 0,
// },

function Ingredient({data}) {
  return (
    <section>{data.name ? data.name : ""}</section>
  )
}

Ingredient.propTypes = {}

export default Ingredient
