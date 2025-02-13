const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

export const bytes_to_base_32 = bytes => {
  let bits = 0
  let bitsCount = 0
  let base32 = ''

  for (let i = 0; i < bytes.length; i++) {
    bits = (bits << 8) | bytes[i]
    bitsCount += 8

    while (bitsCount >= 5) {
      base32 += base32Chars[(bits >>> (bitsCount - 5)) & 0x1f]
      bitsCount -= 5
    }
  }

  if (bitsCount > 0) {
    bits <<= 5 - bitsCount
    base32 += base32Chars[bits & 0x1f]
  }

  while (base32.length % 8 !== 0) {
    base32 += '='
  }

  return base32
}

export const hex_to_bytes = hex => {
  let bytes = []
  for (let c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16))

  return bytes
}
