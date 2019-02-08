import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Tag from '../stackable_tag'
import SidebarSection from '../sidebar/section'

export default function TagCloud() {
  return <SidebarSection title="TAGI">
    <StaticQuery query={graphql`
      {
        allMarkdownRemark {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `}
     render={data => (
       data.allMarkdownRemark.group
         .sort((groupA, groupB) => {
           if (groupB.totalCount == groupA.totalCount) {
             return groupA.fieldValue.localeCompare(groupB.fieldValue)
           }

           return groupB.totalCount - groupA.totalCount
         })
         .map(({fieldValue}) => (
          <Tag name={fieldValue} key={fieldValue} />
       ))
     )} />
  </SidebarSection>
}
