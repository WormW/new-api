import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { buildCustomOAuthAuthorizationUrl } from './oauth'

describe('custom OAuth authorization URL builder', () => {
  test('uses provider authorization endpoint and slug callback URL', () => {
    const url = new URL(
      buildCustomOAuthAuthorizationUrl({
        authorizationEndpoint:
          'https://accounts.feishu.cn/open-apis/authen/v1/authorize',
        clientId: 'cli_a878b4194da1501c',
        redirectUri: 'http://192.168.2.12:3000/oauth/feishu',
        state: 'state-123',
        scopes: 'contact:contact.base:readonly',
      })
    )

    assert.equal(
      `${url.origin}${url.pathname}`,
      'https://accounts.feishu.cn/open-apis/authen/v1/authorize'
    )
    assert.equal(url.searchParams.get('client_id'), 'cli_a878b4194da1501c')
    assert.equal(
      url.searchParams.get('redirect_uri'),
      'http://192.168.2.12:3000/oauth/feishu'
    )
    assert.equal(url.searchParams.get('response_type'), 'code')
    assert.equal(url.searchParams.get('state'), 'state-123')
    assert.equal(url.searchParams.get('scope'), 'contact:contact.base:readonly')
    assert.equal(url.toString().includes('/api/oauth/1'), false)
  })
})
