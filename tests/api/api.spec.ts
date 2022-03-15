import { test, expect } from '@playwright/test'

test.describe.parallel.only('Playwright API', async () => {
  const baseUrl = 'https://reqres.in/api'
  test('Simple API test - Assert Resp Status', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2`)
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
  })

  test('Simple API test - Assert Invalid Endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/non-existent`)
    expect(response.status()).toBe(404)
  })

  test.only('Get Request - Get User Detail', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2`)
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(2)
    expect(responseBody.data.first_name).toBe('Janet')
    expect(responseBody.data.last_name).toBe('Weaver')
    expect(responseBody.data.email).toBeTruthy()
  })
})
