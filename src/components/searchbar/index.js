import React, {createRef} from 'react'
import { navigate } from 'gatsby'
import Select from '../select'
import styles from './searchbar.module.sass'
import {RecentSearchesCache, LocalStorageClient} from './recent'

const loadLocalSearch = () => import('./local_search')

export function isMobileDevice() {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  } catch (e) {
    return false;
  }
}

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props)

    this._selectNode = createRef()

    this.cache = new RecentSearchesCache({
      storage: new LocalStorageClient({name: '_recent_searches'}),
      historySize: 3
    })

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
    this.cache.rememberSelectedOption(selectedOption)
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

  scrollToMenu = () => {
    if (typeof window.scrollBy !== 'function' || !isMobileDevice()) { return }

    const node = this._selectNode.current
    if (!node) { return }

    const box = node.getBoundingClientRect()

    window.scrollBy({
      top: box.top - 10,
      left: 0,
      behavior: 'smooth'
    })
  }

  render() {
    const { className } = this.props
    const { visible, selectedOption } = this.state

    const wrapperClasses = [className, styles.searchbar]

    if (visible) {
      wrapperClasses.push(styles.active)
    }

    return (
      <div ref={this._selectNode} className={wrapperClasses.join(' ')}>
        <Select
          defaultOptions={this.cache.getRecentOptions()}
          noOptionsMessage={this.noOptionMessage}
          value={selectedOption}
          onChange={this.handleChange}
          placeholder='Wyszukaj przepis'
          loadOptions={this.promiseOptions}
          onMenuOpen={this.scrollToMenu}
        />
      </div>
    )
  }
}
