# YubiKey authentication token

YubiKey authentication tokens enable authorized users to access a
variety of UCAR resources. These include high-performance computing
systems managed by CISL (see below) and the [**<u>virtual private
network</u>**](file:////display/RC/VPN+access) (VPN).

![](media/image1.png)

#### Page contents

- [Getting started](#YubiKeyauthenticationtoken-Gettingstart)

- [Logging in with a YubiKey
  4](#YubiKeyauthenticationtoken-Logginginwit)

- [Protecting your token](#YubiKeyauthenticationtoken-Protectingyo)

- [Replacing or returning a
  token](#YubiKeyauthenticationtoken-Replacingorr)

## Getting started

To be able to use your YubiKey token, you first need to complete the
appropriate form and send it to the fax number on the form.

Complete the **Duo/YubiKey4 Acknowledgement Form** [**<u>(click to
download)</u>**](file:////download/attachments/70549660/NCAR%2520DuoYubiKey4%2520Token%2520Receipt%2520Acknowledgement%2520Form_202105013%2520%25281%2529.pdf%3fversion=1&modificationDate=1627401208000&api=v2).
If you have arranged to have a YubiKey 4 token, you will use it in
combination with your CIT password.

By signing the acknowledgement form, you agree to fulfill
your [<u>responsibilities as a
user</u>](file:////display/RC/User+responsibilities) and to protect your
token as follows:

- Your token will remain in your custody and is for your use only;
  it may not be shared.

- You will immediately (within 48 hours) report loss of custody of your
  hardware authentication token to the CISL Help Desk at x2400
  (303-497-2400). Loss of custody may be due to loss or theft.

- Your CIT password may not be shared or made available in unencrypted
  electronic form.

- You will report any disclosure of your CIT password to the CISL Help
  Desk at x2400 (303-497-2400) and/or to the UCAR Security Operations
  Center at x4300 (307-996-4300). 

In addition, you acknowledge that ***acceptance of this token
constitutes an understanding that the token is export controlled such
that export/re-export to Cuba, Iran, Syria, North Korea, or Sudan is
strictly prohibited.***

#### Special requirement for Mac OS X systems only

A user with admin privileges who can tell the system to permanently
recognize the token must plug the token in initially. This will let you
avoid having to go through three dialog boxes every time you log in.

When the dialog box asks you to press the key to the right of the SHIFT
key, touch the button on the token instead.

## Logging in with a YubiKey 4

To log in to a CISL system – Cheyenne, in this example – use
the **ssh** command and your UCAR username as shown.

ssh -X username@cheyenne.ucar.edu

The system will prompt you to enter a token response.

Using keyboard-interactive authentication.

Token_Response:

To respond:

- Insert your token in a USB port. If you have a MacBook or other
  computer or mobile device with a USB-C port, you will need a [<u>USB-C
  adapter</u>](https://support.yubico.com/hc/en-us/articles/360016614860-Using-a-YubiKey-with-USB-C-Adapters).

- Type your CIT password into the “Token_Response” field.

- Lightly touch the gold button on your token. (The button is not
  activated by pressure. Rather, it reacts to contact with your finger.)
  This will insert a new one-time password and you will be logged in.

You can open more than one login session, but you must complete the
authentication process for each session before opening another one.

## Protecting your token

Here are some tips for taking proper care of this electronic device.

- Keep it away from magnets, microwaves, electrostatic shock, and
  X-rays. (Security checkpoints, such as those at airports, are OK.)

- Do not expose it to temperatures below -5 degrees Fahrenheit, above
  120 degrees, or above 90 degrees for sustained periods. (Avoid leaving
  it on your car’s dashboard on a hot day, for example.)

## Replacing or returning a token

Contact the CISL Help Desk if you need to replace or exchange your
YubiKey 4 token.

Users who lose or damage a YubiKey 4 token or fail to [return it when
required](file:////display/RC/Authentication+and+security) will be
billed \$60. The fee can be paid by credit card on the [UCAR Payment Web
Site](https://www.fin.ucar.edu/epayment) or billed to the user's
NCAR/UCAR account key.

For security reasons, the CISL Help Desk cannot routinely arrange
temporary access for users who forget to bring an authentication
token to work. If you are out of town and
need *emergency* access, the [<u>NCAR Research Computing help
desk</u>](https://rchelp.ucar.edu/).

### Loss, theft, or compromise

Loss, theft, or compromise of a YubiKey 4 must be reported within 48
hours to the CISL Help Desk at x2400 (303-497-2400). Quick reporting
will help the organization minimize security risk.

### Refunds

If you return a token intact **within three months** after having paid
for it, we will issue a credit to your credit card or to the NCAR
division that paid for the token if you provide a receipt or other
documentation that the charge was approved.

### Returns

See [Returning your YubiKey 4
token](file:////display/RC/Authentication+and+security).
