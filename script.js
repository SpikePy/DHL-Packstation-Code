function generate()
{
  postNumber = postNumber.value
  console.log(`Post Number: ${postNumber}`)

  // Multiply postNumber with 631
  var postNumberProduct = postNumber * 631
  console.log(`Post Number * 631: ${postNumberProduct}`)

  code = barcodeNumber(postNumberProduct)
  htmlResult.innerHTML  = `Result: <a href="http://barcodegenerator.online/indexbarcode.asp?bc1=${code}&bc2=28&bc3=3.5&bc4=1.2&bc9=1&bc5=11&bc6=11&bc7=Arial&bc8=15">${code}</a> (Click the link to generate the ITF-14 Code)`
}

function luhnMod10(number)
{
  var number = number.toString()
  var sum = 0

  var numberLength = number.toString().length
  console.log(`Number Length: ${numberLength}`)

  // Double every second digit
  for (index = 1; index <= numberLength; index++)
  {
    console.log(`Digit: ${number[numberLength - index]}`)
    if (index % 2 != 0)
    {
      add = parseInt(number[numberLength - index])
      reason = `Add ${add} (because only every second gets duplicated)`
    }
    else
    {
      add = parseInt(number[numberLength - index]) * 2
      reason = `Add ${add} (because every second gets duplicated)`
      // If the digit is greater than 9 substract 9
      if (add > 9)
      {
        add -= 9
        reason = `Add ${add} (because if duplicated value is greater 9 substract 9 from it)`
      }
    }

    console.log(reason)
    // Sum all digits
    sum += add
  }
  console.log(`Sum: ${sum}`)
  // Return only the last digit
  result = sum % 10
  console.log(`Return: ${result}`)
  return result
}

function barcodeNumber(number)
{
  return '3' + '0'.repeat(14-number.toString().length) + number + luhnMod10(number)
}
