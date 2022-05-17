import React from 'react'
import PropTypes from 'prop-types'

import Ingredient from '../ingredient/ingredient'
import dataSet from "../utils/data"

function BurgerIngredients(props) {
  

  return (
    <section>
      BurgerIngredients
      {
        dataSet.map(data => <Ingredient key={data.id} data={data} />)
      }
    </section>
  )
}

BurgerIngredients.propTypes = {}

export default BurgerIngredients
