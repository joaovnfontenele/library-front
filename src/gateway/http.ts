interface httpProps {
  url?: string
  token?: string
}
interface response<T> {
  data: T
  error?: any
}

export class Http {
  private _props: httpProps

  constructor({ url, token }: httpProps) {
    this._props = {
      url,
      token,
    }
  }

  setToken(tokem: string) {
    this._props.token = tokem
  }
  get token() {
    return this._props.token
  }

  async get<T>(path: string, options?: RequestInit): Promise<response<T>> {
    const headers = {
      'Content-Type': 'application/json',
      ...(this._props.token && { Authorization: this._props.token }),
      ...(options?.headers && { ...options.headers }),
    }

    const url = this._props.url ? `${this._props.url}${path}` : `${path}`

    const response = await fetch(url, {
      ...options,
      headers,
      method: 'GET',
    })

    const data = await response.json()

    if (data.error) {
      return { data: data, error: data.error }
    }

    return { data: data, error: false }
  }
  async post<T>(
    path: string,
    body?: any,
    options?: RequestInit,
  ): Promise<response<T>> {
    const headers = {
      'Content-Type': 'application/json',
      ...(this._props.token && { Authorization: this._props.token }),
      ...(options?.headers && { ...options.headers }),
    }

    const url = this._props.url ? `${this._props.url}${path}` : `${path}`

    const response = await fetch(url, {
      ...options,
      headers,
      body: JSON.stringify(body),
      method: 'POST',
    })

    const data = await response.json()

    if (data.error) {
      return { data: data, error: data.error }
    }

    return { data: data, error: false }
  }
  put() {}
  async delete<T>(path: string, options?: RequestInit) {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      ...(this._props.token && { Authorization: this._props.token }),
      ...(options?.headers && { ...options.headers }),
    }

    const url = this._props.url ? `${this._props.url}${path}` : `${path}`

    const response = await fetch(url, {
      ...options,
      headers,
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
  }
}
