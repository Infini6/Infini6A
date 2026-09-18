import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from 'react'

import {
  Building2,
  Check,
  Edit3,
  Eye,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  X,
} from 'lucide-react'

import {
  emptyHospitalForm,
  type Hospital,
  type HospitalFormValues,
  type HospitalStatus,
} from '../data/hospitalsData'

import {
  createHospital,
  getHospitals,
  updateHospital,
} from '../services/api'

import './HospitalsPage.css'
import '../components/PortalPrimitives'

type ModalState =
  | { mode: 'view' | 'edit' | 'status'; hospital: Hospital }
  | { mode: 'add' }
  | null

function HospitalForm({
  initialValues,
  onCancel,
  onSave,
}: {
  initialValues: HospitalFormValues
  onCancel: () => void
  onSave: (values: HospitalFormValues) => Promise<void>
}) {
  const [values, setValues] = useState(initialValues)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const update = (
    field: keyof HospitalFormValues,
    value: string,
  ) => {
    setValues((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (
      !values.name.trim() ||
      !values.code.trim() ||
      !values.location.trim() ||
      !values.contactEmail.trim() ||
      !values.contactPhone.trim() ||
      !values.operatingHours.trim()
    ) {
      setError(
        'Complete all required fields before saving.',
      )
      return
    }

    try {
      setSaving(true)
      setError('')
      await onSave(values)
    } catch (err: any) {
      setError(err.message || 'Unable to save hospital')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form
      className="hospital-form"
      onSubmit={submit}
    >
      <div className="form-grid">

        <label>
          Hospital name *
          <input
            value={values.name}
            onChange={(e) =>
              update('name', e.target.value)
            }
          />
        </label>

        <label>
          Hospital code *
          <input
            value={values.code}
            onChange={(e) =>
              update(
                'code',
                e.target.value.toUpperCase(),
              )
            }
            disabled={false}
          />
        </label>

        <label>
          Location *
          <input
            value={values.location}
            onChange={(e) =>
              update('location', e.target.value)
            }
          />
        </label>

        <label>
          Contact email *
          <input
            type="email"
            value={values.contactEmail}
            onChange={(e) =>
              update(
                'contactEmail',
                e.target.value,
              )
            }
          />
        </label>

        <label>
          Contact phone *
          <input
            value={values.contactPhone}
            onChange={(e) =>
              update(
                'contactPhone',
                e.target.value,
              )
            }
          />
        </label>

        <label>
          Operating hours *
          <input
            value={values.operatingHours}
            onChange={(e) =>
              update(
                'operatingHours',
                e.target.value,
              )
            }
            placeholder="Open 24 hours"
          />
        </label>

        <label>
          Status
          <select
            value={values.status}
            onChange={(e) =>
              update(
                'status',
                e.target.value as HospitalStatus,
              )
            }
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </label>

      </div>

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

      <div className="modal-actions">

        <button
          className="outline-button"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          className="primary-button"
          type="submit"
          disabled={saving}
        >
          <Check size={15} />
          {saving
            ? 'Saving...'
            : 'Save hospital'}
        </button>

      </div>
    </form>
  )
}

function HospitalDetails({
  hospital,
  onClose,
}: {
  hospital: Hospital
  onClose: () => void
}) {
  return (
    <div className="details-panel">

      <div className="details-intro">

        <div className="hospital-avatar">
          <Building2 size={21} />
        </div>

        <div>
          <h3>{hospital.name}</h3>

          <p>
            {hospital.code}{' '}
            <span
              className={`status-badge ${hospital.status.toLowerCase()}`}
            >
              {hospital.status}
            </span>
          </p>
        </div>

      </div>

      <div className="contact-list">

        <p>
          <MapPin size={15} />
          {hospital.location}
        </p>

        <p>
          <Mail size={15} />
          {hospital.contactEmail}
        </p>

        <p>
          <Phone size={15} />
          {hospital.contactPhone}
        </p>

        <p>
          <Building2 size={15} />
          {hospital.operatingHours}
        </p>

      </div>

      <div className="detail-stats">

        <div>
          <strong>
            {hospital.departments}
          </strong>
          <span>Departments</span>
        </div>

        <div>
          <strong>
            {hospital.doctors}
          </strong>
          <span>Doctors</span>
        </div>

        <div>
          <strong>
            {hospital.activePatients}
          </strong>
          <span>Active patients</span>
        </div>

        <div>
          <strong>
            {hospital.appointmentsToday}
          </strong>
          <span>Appointments today</span>
        </div>

      </div>

      <div className="modal-actions">
        <button
          className="outline-button"
          type="button"
          onClick={onClose}
        >
          Close
        </button>
      </div>

    </div>
  )
}

export function HospitalsPage() {

  const [hospitals, setHospitals] =
    useState<Hospital[]>([])

  const [query, setQuery] =
    useState('')

  const [statusFilter, setStatusFilter] =
    useState<'All' | HospitalStatus>('All')

  const [modal, setModal] =
    useState<ModalState>(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  async function loadHospitals() {

    try {

      setLoading(true)
      setError('')

      const data =
        await getHospitals()

      const formatted: Hospital[] =
        data.map((hospital: any) => ({

          id: hospital.id,

          name: hospital.name,

          code: hospital.code,

          location:
            hospital.address || '',

          contactEmail:
            hospital.email || '',

          contactPhone:
            hospital.contactNumber || '',

          operatingHours:
            hospital.operatingHours?.length
              ? 'Configured'
              : 'Not configured',

          status:
            hospital.status === 'ACTIVE'
              ? 'Active'
              : 'Inactive',

          admin:
            'Not assigned',

          departments: 0,

          doctors: 0,

          activePatients: 0,

          appointmentsToday: 0,

          waitingPatients: 0,

          averageWaitingTime:
            '0 min',

        }))

      setHospitals(formatted)

    } catch (err: any) {

      setError(
        err.message ||
          'Unable to load hospitals',
      )

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {

    loadHospitals()

  }, [])

  const filteredHospitals =
    useMemo(
      () =>
        hospitals.filter(
          (hospital) =>
            (
              statusFilter === 'All' ||
              hospital.status ===
                statusFilter
            ) &&
            `${hospital.name} ${hospital.location}`
              .toLowerCase()
              .includes(
                query.toLowerCase(),
              ),
        ),
      [
        hospitals,
        query,
        statusFilter,
      ],
    )

  const activeCount =
    hospitals.filter(
      (hospital) =>
        hospital.status === 'Active',
    ).length

  async function saveHospital(
    values: HospitalFormValues,
  ) {

    if (
      modal?.mode === 'edit'
    ) {

      await updateHospital(
        modal.hospital.id,
        {
          name: values.name,
          address: values.location,
          contactNumber:
            values.contactPhone,
          email:
            values.contactEmail,
          status:
            values.status === 'Active'
              ? 'ACTIVE'
              : 'INACTIVE',
        },
      )

    } else {

      await createHospital({
        name: values.name,
        code: values.code,
        address:
          values.location,
        contactNumber:
          values.contactPhone,
        email:
          values.contactEmail,
      })

    }

    setModal(null)

    await loadHospitals()
  }

  async function changeStatus(
    hospital: Hospital,
  ) {

    try {

      const newStatus =
        hospital.status === 'Active'
          ? 'INACTIVE'
          : 'ACTIVE'

      await updateHospital(
        hospital.id,
        {
          status: newStatus,
        },
      )

      setModal(null)

      await loadHospitals()

    } catch (err: any) {

      alert(
        err.message ||
          'Unable to change status',
      )

    }
  }

  if (loading) {

    return (
      <section className="hospitals-page">
        <h2>Hospitals</h2>
        <p>Loading hospitals...</p>
      </section>
    )
  }

  return (
    <section className="hospitals-page">

      <div className="page-heading hospitals-heading">

        <div>
          <p className="eyebrow">
            Platform directory
          </p>

          <h2>Hospitals</h2>

          <p>
            Manage hospitals connected
            to the Smart Hospital platform.
          </p>
        </div>

        <button
          className="primary-button"
          type="button"
          onClick={() =>
            setModal({
              mode: 'add',
            })
          }
        >
          <Plus size={16} />
          Add hospital
        </button>

      </div>

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

      <div className="hospital-summary">

        <article>
          <span>Total hospitals</span>
          <strong>
            {hospitals.length}
          </strong>
        </article>

        <article>
          <span>
            Active hospitals
          </span>
          <strong className="summary-active">
            {activeCount}
          </strong>
        </article>

        <article>
          <span>
            Inactive hospitals
          </span>
          <strong className="summary-inactive">
            {hospitals.length -
              activeCount}
          </strong>
        </article>

      </div>

      <div className="hospital-toolbar">

        <div className="search-box">

          <Search size={16} />

          <input
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="Search by hospital name or location"
          />

        </div>

        <div className="filter-group">

          {(
            [
              'All',
              'Active',
              'Inactive',
            ] as const
          ).map((status) => (

            <button
              key={status}
              type="button"
              className={
                statusFilter === status
                  ? 'selected'
                  : ''
              }
              onClick={() =>
                setStatusFilter(status)
              }
            >
              {status}
            </button>

          ))}

        </div>

      </div>

      <section className="dashboard-card hospital-table-card">

        <div className="table-scroll">

          <table className="hospital-table">

            <thead>
              <tr>
                <th>Hospital name</th>
                <th>Code</th>
                <th>Location</th>
                <th>
                  Hospital admin
                </th>
                <th>Doctors</th>
                <th>
                  Active patients
                </th>
                <th>
                  Appointments today
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredHospitals.map(
                (hospital) => (

                  <tr
                    key={hospital.id}
                  >

                    <td>
                      <strong>
                        {hospital.name}
                      </strong>
                    </td>

                    <td>
                      {hospital.code}
                    </td>

                    <td>
                      {hospital.location}
                    </td>

                    <td>
                      {hospital.admin}
                    </td>

                    <td>
                      {hospital.doctors}
                    </td>

                    <td>
                      {hospital.activePatients}
                    </td>

                    <td>
                      {hospital.appointmentsToday}
                    </td>

                    <td>

                      <span
                        className={`status-badge ${hospital.status.toLowerCase()}`}
                      >
                        {hospital.status}
                      </span>

                    </td>

                    <td>

                      <div className="row-actions">

                        <button
                          type="button"
                          title="View hospital"
                          onClick={() =>
                            setModal({
                              mode: 'view',
                              hospital,
                            })
                          }
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          type="button"
                          title="Edit hospital"
                          onClick={() =>
                            setModal({
                              mode: 'edit',
                              hospital,
                            })
                          }
                        >
                          <Edit3 size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setModal({
                              mode: 'status',
                              hospital,
                            })
                          }
                        >
                          {hospital.status ===
                          'Active' ? (
                            <X size={15} />
                          ) : (
                            <Check size={15} />
                          )}
                        </button>

                      </div>

                    </td>

                  </tr>

                ),
              )}

            </tbody>

          </table>

        </div>

        {filteredHospitals.length ===
          0 && (
          <div className="empty-state">

            <Search size={20} />

            <strong>
              No hospitals found
            </strong>

            <p>
              No hospitals are currently
              stored in the database.
            </p>

          </div>
        )}

      </section>

      {modal && (

        <div
          className="modal-backdrop"
          onMouseDown={(event) =>
            event.target ===
              event.currentTarget &&
            setModal(null)
          }
        >

          <section className="hospital-modal">

            <div className="modal-header">

              <div>

                <h2>

                  {modal.mode === 'add'
                    ? 'Add hospital'
                    : modal.mode === 'edit'
                      ? 'Edit hospital'
                      : modal.mode === 'view'
                        ? modal.hospital.name
                        : 'Change hospital status'}

                </h2>

              </div>

              <button
                className="icon-button"
                onClick={() =>
                  setModal(null)
                }
              >
                <X size={17} />
              </button>

            </div>

            {modal.mode ===
              'view' && (

              <HospitalDetails
                hospital={
                  modal.hospital
                }
                onClose={() =>
                  setModal(null)
                }
              />

            )}

            {(modal.mode ===
              'add' ||
              modal.mode ===
                'edit') && (

              <HospitalForm
                initialValues={
                  modal.mode ===
                  'edit'
                    ? modal.hospital
                    : emptyHospitalForm
                }
                onCancel={() =>
                  setModal(null)
                }
                onSave={
                  saveHospital
                }
              />

            )}

            {modal.mode ===
              'status' && (

              <div className="status-confirm">

                <p>
                  Change{' '}
                  <strong>
                    {
                      modal.hospital
                        .name
                    }
                  </strong>{' '}
                  to{' '}
                  <strong>
                    {modal.hospital
                      .status ===
                    'Active'
                      ? 'Inactive'
                      : 'Active'}
                  </strong>
                  ?
                </p>

                <div className="modal-actions">

                  <button
                    className="outline-button"
                    onClick={() =>
                      setModal(null)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    className="primary-button"
                    onClick={() =>
                      changeStatus(
                        modal.hospital,
                      )
                    }
                  >
                    Confirm
                  </button>

                </div>

              </div>

            )}

          </section>

        </div>

      )}

    </section>
  )
}