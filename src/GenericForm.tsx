import { Formik, Field, Form, FormikProps} from 'formik';
import { FormFieldSelectOption, FormFieldConfig, FormConfig } from './interfaces'
import './GenericForm.css'
import 'whatwg-fetch'
import * as Yup from 'yup';

interface GenericFormProps {
  config: FormConfig
}


const GenericForm = ({ config }: GenericFormProps ) => {

  const FormValidationSchema = Yup.lazy(obj => Yup.object(
    Object.keys(obj).reduce( (prev, key) => {
      const field = config.fields.find( f => f.name === key )
      let rule = Yup.string()
      if (field) {
        // if (field.validate === 'number') { rule = Yup.number() }
        if (field.validate === 'email') { rule = rule.email('A valid email is required')}
        if (field.maxlen) { rule = rule.max(field.maxlen)}
        if (field.required) { rule = rule.required('This field is required') }
      }
      if (rule) return { ...prev, [key]: rule };
      else return prev;
    }, {} )
  ) )

  const initvals: any = {}
  config.fields.forEach( (field: FormFieldConfig) => {
    initvals[field.name] = field.value ? field.value : ''
  })

  return(
  <div>

    {config.title &&
    <h3>{config.title}</h3>
    }

    <Formik
      initialValues={initvals}
      validationSchema={FormValidationSchema}
      onSubmit={async (values) => {
        fetch(config.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)}).then( response => { alert(response) })
      }}
    >

      {(props: FormikProps<any>) => (

      <Form>

        { config.fields.map( (field: FormFieldConfig) => {

          switch (field.input) {

            case 'textarea':
              return(
                <div className={field.classes ? `${field.classes} feffield` : 'feffield'} key={`${config.name}-${field.name}`}>
                  <label htmlFor={field.name}>{field.label}</label>
                  <Field id={field.name} name={field.name} as="textarea" placeholder={field.placeholder ? field.placeholder : ''} />
                  {props.errors[field.name] && props.touched[field.name] ? (
                  <div className="field-error">{props.errors[field.name]}</div>
                  ) : null}
                </div>
            )

            case 'select':
              if (field.options) {
                return(
                  <div className={field.classes ? `${field.classes} feffield` : 'feffield'} key={`${config.name}-${field.name}`}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <Field id={field.name} name={field.name} as="select">
                    { field.options.map( (option: FormFieldSelectOption) => (
                      <option key={`${config.name}-${field.name}-${option.value}`} value={option.value}>{option.label}</option>
                    )) }
                    </Field>
                    {props.errors[field.name] && props.touched[field.name] ? (
                    <div className="field-error">{props.errors[field.name]}</div>
                    ) : null}
                  </div>
                )
              } else { return null }

            case 'checkbox':
              return(
                <div className={field.classes ? `${field.classes} feffield` : 'feffield'} key={`${config.name}-${field.name}`}>
                  <label htmlFor={field.name}>{field.label}</label>
                  <Field id={field.name} name={field.name} type="checkbox" value={field.value} />
                  {props.errors[field.name] && props.touched[field.name] ? (
                  <div className="field-error">{props.errors[field.name]}</div>
                  ) : null}
                </div>
            )

            case 'hidden':
              if (field.value) {
                return <Field key={`${config.name}-${field.name}`} id={field.name} name={field.name} type="hidden" value={field.value} />
              } else { return null }

            case 'email':
              return(
                <div className={field.classes ? `${field.classes} feffield` : 'feffield'} key={`${config.name}-${field.name}`}>
                  <label htmlFor={field.name}>{field.label}</label>
                  <Field id={field.name} name={field.name} type="email" placeholder={field.placeholder ? field.placeholder : ''} />
                  {props.errors[field.name] && props.touched[field.name] ? (
                  <div className="field-error">{props.errors[field.name]}</div>
                  ) : null}
                </div>
              )

            default: // Text field
              return(
                <div className={field.classes ? `${field.classes} feffield` : 'feffield'} key={`${config.name}-${field.name}`}>
                  <label htmlFor={field.name}>{field.label}</label>
                  <Field id={field.name} name={field.name} placeholder={field.placeholder ? field.placeholder : ''} />
                  {props.errors[field.name] && props.touched[field.name] ? (
                  <div className="field-error">{props.errors[field.name]}</div>
                  ) : null}
                </div>
              )
        }
      }) }

      <button type="submit" disabled={Object.keys(props.errors).length ? true : false}>{config.submit ? config.submit : 'Submit'}</button>

      </Form>

      )}

    </Formik>

  </div>
) }


export default GenericForm