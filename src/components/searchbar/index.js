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

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    marginTop: 0,
    borderRadius: 0
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: 0
  })
}

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: !!props.forceVisibility,
      selectedOption: null
    }
  }

  componentDidMount() {
    this.setState({ visible: true })
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
    const { className } = this.props
    const { visible, selectedOption } = this.state

    const wrapperClasses = [className, styles.searchbar]

    if (visible) {
      wrapperClasses.push(styles.active)
    }

    return (
      <div className={wrapperClasses.join(' ')}>
        <Select
          styles={customStyles}
          noOptionsMessage={this.noOptionMessage}
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
