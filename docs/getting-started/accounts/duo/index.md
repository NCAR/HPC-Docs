# Authenticating with Duo

![](media/image1.png){width="300"}

!!! danger
    NCAR Duo Authentication is export-controlled. Taking the app on your
    phone to Cuba, Iran, Syria, North Korea, or Sudan is strictly
    prohibited.

## Overview

Logging in with Duo two-factor authentication (2FA) requires you to
enter a CIT password and then use a Duo-configured device to confirm
your identity.

**Best practice recommendation:** Use a screen lock on your mobile
device to increase security.

Three ways of logging in with Duo:

1.  **Push notification (preferred)**
    The app sends a request (a "push" notification) to your phone or
    tablet, asking you to approve or deny the login request.

2.  **Rolling passcode**
    When you can't receive a push notification, enter both your CIT
    password and a numerical passcode from the Duo app, separated by a
    comma. Example: **password,passcode**

3.  **Phone callback**
    Enter your CIT password and the word "phone," separated by a comma,
    then follow instructions you receive in a phone call. Example:
    **password,phone**

The examples below use the **push notification** method of
authentication. See [How to Use Append Mode](https://guide.duo.com/append-mode) for more information on
other methods.

## Getting started with Duo

To get started, contact the [NCAR Research Computing help desk](https://rchelp.ucar.edu/) to request enrollment (and to get a
CIT password if you don't already have one).

CISL will send you a link for setting up a Duo account.

During setup, Duo asks some questions about the device you want to use.
Smartphone and tablet users are asked to download [this free **Duo Mobile** app](https://duo.com/product/trusted-users/two-factor-authentication/duo-mobile).


When your setup is complete, follow the instructions below to log in to
the system, such as Cheyenne, the NCAR virtual private network, or
others that accept Duo 2FA.

## Logging in with Duo

#### HPC and SSH logins

To log in to a system like Derecho:

  - Enter [your ssh command](../../../compute-systems/derecho/index.md).
  - Enter your **CIT password** where a token response is requested.

![](media/image2.png){width="400"}

The Duo App will send a "push" notification to your phone or tablet,
asking you to approve or deny the login request.

When you approve the request, you will be logged in.

#### Other application logins

Duo authentication with other systems is somewhat different. Logging on
to the NCAR virtual private network ([VPN](../../vpn-access.md)) is one example.

You will:

  - Enter your username.
  - Enter your CIT password.
  - You may get an automatic Duo Push, or select **Send Me a Push** from
    the Duo screen.

The Duo App will send a push notification to your phone or tablet,
asking you to approve or deny the login request.

When you approve the request, you will be logged in.

![](media/image3.png){width="200"}

## Duo Device Portal

The [Duo Device Portal](https://duodeviceportal.ucar.edu/) is
where you can change device settings, add new devices (a new smartphone,
tablet or landline), or update your preferred contact methods.

You can also choose to have Duo send you a push automatically after you
enter your CIT password. Look for "When I log in" after you sign in to
the portal.

![](media/image4.png){width="400"}

#### Changing smartphone

When you replace your smartphone and need to use it to authenticate, use
one of the following methods to get your new phone up and running with
Duo Mobile:

**Recommended:** [Duo Instant Restore](https://guide.duo.com/duo-restore), a feature for recovering
Duo-protected accounts.

**Alternative:**

  - Go to the [Duo Device Portal](https://duodeviceportal.ucar.edu/).
  - Choose **Call Me**. Even if your phone number hasn't changed, Duo
    needs to call your new phone to complete the setup process.

## User guides and related links

For additional information, see the following links
or contact the [NCAR Research Computing help desk](https://rchelp.ucar.edu/) for assistance:

- [Common issues](https://guide.duo.com/common-issues)

- [Duo Guide to Two-Factor Authentication](https://guide.duo.com/)

- [Duo Travel Guide](https://duo.com/assets/pdf/Duo_Travel_Guide.pdf)

- [Duo Quick Sheet](https://docs.google.com/document/d/1odzRo5hDpQa9EzYv7e_vSJ2HsG_wBo1HV9kLlJ_A6ZQ/edit?usp=sharing)
