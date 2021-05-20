function generate()
{
  if (document.getElementById("postNumber").value == '')
  {
    htmlResultHeadline.innerHTML  = 'Input a valid post number'
    htmlResult.innerHTML          = ''
    htmlResultBarcode.innerHTML   = ''
  }
  else
  {
    postNumber = document.getElementById("postNumber").value
    console.log(`Post Number: ${postNumber}`)

    // Multiply postNumber with 631
    var postNumberProduct = postNumber * 631
    console.log(`Post Number * 631: ${postNumberProduct}`)

    code = barcodeNumber(postNumberProduct)
    htmlResultHeadline.innerHTML  = 'Result'
    htmlResult.innerHTML          = code
    htmlResultBarcode.innerHTML   = `<image title="ITF-14 barcode" src="http://barcodegenerator.online/barcode.asp?bc1=${code}&bc2=28&bc3=5000&bc4=1000&bc5=0&bc6=1&bc7=Arial&bc8=15&bc9=3">`
  }
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
  result = (10 - sum) % 10
  console.log(`Return: ${result}`)
  return result
}

function barcodeNumber(number)
{
  return '3' + '0'.repeat(14-number.toString().length) + number + luhnMod10(number)
}
