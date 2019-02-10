import React from 'react'
import MagnifierIcon from '../magnifier'
import { navigate } from 'gatsby'
import Select from 'react-select/lib/Async'
import { components } from 'react-select'
import styles from './searchbar.module.sass'

const loadLocalSearch = () => import('./local_search')

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <MagnifierIcon />
    </components.DropdownIndicator>
  );
};

export default class Searchbar extends React.Component {
  state = {
    stateClass: null,
    selectedOption: null
  }

  componentDidMount() {
    this.setState({ stateClass: styles.active })
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption })
    navigate(selectedOption.value)
  }

  promiseOptions = (inputValue) => {
    return loadLocalSearch().then(module => {
      const search = module.default
      return search(inputValue)
    })
  }

  noOptionMessage = ({inputValue}) => {
    if (inputValue.length === 0) return null

    return 'Nie znaleziono'
  }

  render() {
    const {className} = this.props
    const {stateClass, selectedOption} = this.state

    return (
      <div className={[className, stateClass, styles.searchbar].join(' ')}>
        <Select
          noOptionsMessage={this.noOptionMessage}
          className={[className, stateClass, styles.searchbar].join(' ')}
          value={selectedOption}
          onChange={this.handleChange}
          components={{DropdownIndicator}}
          placeholder='Wyszukaj przepis'
          loadOptions={this.promiseOptions}
        />
      </div>
    )
  }
}
