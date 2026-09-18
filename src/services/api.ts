const API_BASE = 'http://localhost:3000/api/v1'

function getToken() {
  return localStorage.getItem('accessToken')
}

async function request(url: string, options: RequestInit = {}) {
  const token = getToken()

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })

  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    const messages = Array.isArray(result?.message)
      ? result.message
      : Array.isArray(result?.errors)
        ? result.errors.map((error: any) => typeof error === 'string' ? error : error.message ?? Object.values(error.constraints ?? {}).join(', '))
        : null
    throw new Error(
      messages?.filter(Boolean).join('; ') ||
      result?.message ||
      result?.error?.message ||
      'Request failed'
    )
  }

  return result?.data ?? result
}

export async function loginAdmin(email: string, password: string) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email,
      password,
    }),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result?.message || 'Login failed')
  }

  localStorage.setItem('accessToken', result.data.accessToken)
  localStorage.setItem('user', JSON.stringify(result.data.user))

  return result.data
}

export async function getHospitals() {
  return request('/hospitals')
}

export async function createHospital(data: {
  name: string
  code: string
  address: string
  contactNumber: string
  email: string
}) {
  return request('/hospitals', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      timezone: 'Asia/Kolkata',
    }),
  })
}

export async function updateHospital(
  id: string,
  data: {
    name?: string
    address?: string
    contactNumber?: string
    email?: string
    status?: 'ACTIVE' | 'INACTIVE'
  },
) {
  return request(`/hospitals/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export type CreateHospitalAdminPayload = {
  email: string
  password: string
  fullName: string
  hospitalId: string
  phone: string
}

export async function getHospitalAdmins() {
  return request('/platform-admin/hospital-admins')
}

export async function createHospitalAdmin(data: CreateHospitalAdminPayload) {
  return request('/platform-admin/hospital-admins', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateHospitalAdmin(id: string, data: { status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' }) {
  return request(`/platform-admin/hospital-admins/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export async function getPatients() {
  return request('/platform-admin/patients')
}

export async function getDoctorsByHospital(hospitalId: string) {
  return request(`/hospitals/${hospitalId}/doctors`)
}

export async function getPlatformDashboard() {
  return request('/platform-admin/dashboard')
}

export async function getHospitalAnalytics(hospitalId: string, date?: string) {
  const query = date ? `?date=${encodeURIComponent(date)}` : ''
  return request(`/hospitals/${hospitalId}/analytics/dashboard${query}`)
}

export async function getAppointments(filters: { hospitalId?: string; doctorId?: string; date?: string } = {}) {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => { if (value) params.set(key, value) })
  const query = params.toString() ? `?${params.toString()}` : ''
  return request(`/appointments${query}`)
}

export async function getAuditLogs(filters: { hospitalId?: string; action?: string; actorUserId?: string } = {}) {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => { if (value) params.set(key, value) })
  const query = params.toString() ? `?${params.toString()}` : ''
  return request(`/audit-logs${query}`)
}

export async function getLiveMonitor() {
  return request('/platform-admin/live-monitor')
}

export async function getAlerts(filters: { hospitalId?: string; status?: string } = {}) {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => { if (value) params.set(key, value) })
  const query = params.toString() ? `?${params.toString()}` : ''
  return request(`/platform-admin/alerts${query}`)
}

export async function acknowledgeAlert(id: string) {
  return request(`/platform-admin/alerts/${id}/acknowledge`, { method: 'PATCH' })
}

export async function resolveAlert(id: string) {
  return request(`/platform-admin/alerts/${id}/resolve`, { method: 'PATCH' })
}