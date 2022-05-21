
import React from 'react'
import ReactDOM from 'react-dom'
import GenericForm from './GenericForm'
import { FormConfig } from './interfaces'

declare global {
  interface Window {
      forms:FormConfig[]
  }
}

const forms = window.forms

if (typeof forms !== 'undefined') {

  forms.map( (form: FormConfig) => (
    ReactDOM.render(
      <React.StrictMode>
        <GenericForm config={form} />
      </React.StrictMode>,
      document.getElementById(form.selector)
    )
  ) )

}