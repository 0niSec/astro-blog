---
title: "Shocker"
description: "An easy rated Linux machine that demonstrates the Shellshock vulnerability. Once the vulnerability is exploited, the attacker is able to escalate privileges through the perl binary."
tags: ["writeup", "htb", "gtfobins", "sudo", "cve", "shellshock"]
slug: "shocker"
cover: "../../assets/images/Shocker.png"
pubDate: 2024-08-02
os: "linux"
htbMachineActive: false
---

## Table of Contents

## Reconnaisance

Always gotta' start out with `nmap`.

![nmap](../../assets/images/shocker-nmap.webp)

The standard ports are open and we can see that the OS is Linux. SSH seems to be running on a non-standard port of 2222. Weird, but okay.

## Enumeration

We start by navigating to the HTTP webpage being hosted by Apache.

![webpage](../../assets/images/shocker-homepage.webp)

Just a silly little page. Not much to do here, so let's move into enumerating the web directory.

![gobuster1](../../assets/images/shocker-gobuster.webp)

_Without the `-f` flag to append the trailing `/` at the end, the web server treats each request as a file path and returns a 404 instead of another code that `gobuster` is configured to return by default. You can test this by trying to request http://\<ip>/cgi-bin vs. http://\<ip>/cgi-bin/. The former returns a 404 error page and the latter returns a 403._

So now we want to see what files might be hidden in the `cgi-bin` directory. We search common file extensions `sh, pl, php, txt, cgi`. It takes a while because I forgot to set my threads, but we eventually see that there is a `user.sh` script that is not returning a 403. Bingo.

![gobuster2](../../assets/images/shocker-gobuster2.webp)

There's a `.sh` script that is being executed. If we just request the file, it prompts us to download it. We can read it out to see what it is.

![user.sh](../../assets/images/shocker-user-sh.webp)

Since we have a `/cgi-bin` directory and an accessible bash script, we can assume that this is a cgi script and we can try to exploit it. Given the name of the box, we can assume that this is a shellshock exploit.

We can fire up Metasploit and do a quick search for the exploit.

![msfconsole](../../assets/images/shocker-msfconsole.webp)

There's a lot of options here, but we're dealing with Apache and cgi, so we're going to pick the `apache_mod_cgi_bash_env_exec` exploit.

![msf-options](../../assets/images/shocker-msf-options.webp)
![msf-options2](../../assets/images/shocker-msf-options2.webp)
![msf-full-options](../../assets/images/shocker-msf-full-options.webp)

Once we confirm our options, we can run the exploit.

## Exploitation

![msf-exploit](../../assets/images/shocker-msf-exploit.webp)

And just like that, we have a meterpreter session. We can immediately check who our user is.

![user](../../assets/images/shocker-msf-getuid.webp)

We are `shelly`. Let's see if we can find the user flag.

![download-flag](../../assets/images/shocker-msf-download-user-flag.webp)

![user-flag](../../assets/images/shocker-user-flag.webp)

We find the user flag in `/home/shelly` and download it to our attacking machine using meterpreter.

If we drop into a shell and run `sudo -l`, we see that we can run `perl` as root with no password.

![sudo-l](../../assets/images/shocker-sudo-l.webp)

## Privilege Escalation

Escalating privileges with the perl binary is very trivial. We can use [GTFOBins](https://gtfobins.github.io) to find the exploit.

If we search for `perl` in GTFOBins, and scroll down to the [sudo](https://gtfobins.github.io/gtfobins/perl/#sudo) section, we see that we can use the `-e` flag to execute commands.

```bash
sudo perl -e 'exec "/bin/sh";'
```

![sudo-perl](../../assets/images/shocker-perl-gtfo.webp)

And now we're root. Getting the final flag is easy.

![root-flag](../../assets/images/shocker-root-flag.webp)

## Conclusion & Lessons Learned

I went through this box with a co-worker who is also trying to get into cyber security as a sort of "study session". We used the "Guided Mode" to take it easy and learn the process. I was already aware of the machine from discourse on social media and YouTube so I knew that shellshock was the vulnerability to use, but didn't know anything beyond that.

But like every other machine that I've done up to this point, I really enjoyed this one. Doing it collaboratively with someone is also really helpful since we can bounce ideas off of each other and learn from each other. Yay teamwork.
