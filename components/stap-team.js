"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Rajan Karki",
    role: "Front Desk Officer",
    image: "data:image/jpeg;base64,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", // replace with actual image path
    color: "#3d52c4",
  },
  {
    name: "Mohit Surkheti",
    role: "HOD - Documentation",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAFBgMEBwABAv/EAEAQAAIBAwMBBQUECAQGAwAAAAECAwAEEQUSITEGEyJBURQyYXGBkaGx8BUjQlLB0eHxBxYkM0NigpKi0lNUcv/EABgBAAMBAQAAAAAAAAAAAAAAAAECAwAE/8QAIBEAAgIDAAMBAQEAAAAAAAAAAAECERIhMQMiQTJhE//aAAwDAQACEQMRAD8Ay+3neEDb18qOabrU8VwGV+SMGl1Tu5ohpk0YfbJ58GoNF4sta/eNdShujeo86p6ZbxXUwE3rUt+I93DeHyoeJjG/g8q26M+mq6HoOnT2eAkbHHOOtLusdmzZaogtixVmOM8gUL0XXLi0k8BJyOgpx0e5ubq4W4vYyI/eXdU3YyPrSYXtogsqYPr61Ne2wuZPCdqAc196xqdtGVRf9xjmr1hCLqANC/iNTpjoHjTLeKIM20/GmXRlheIIozgUFn0mYsweRvp0q72Yj7p5Iw3C/jTw6JI97V29umnMzxqOtYpdODI49HOPlW/6/ae0WTx4zkdPWsT1XTRFq/cwr4i3uin4wVo7szdLY6tFO/u55+VPGv8AaiF7dIrRS8gIOR+yPWlUdnNRRkX2WVk2btwweMjgY68kVct+zl7DJvaBskeIOThh55P9aDQy4VLxNT1QRrJ3ndk5Bc+9TLY6VBJpG27/AGRg7v4VQ1aeeO09nji7qWM8B+VxnGVI+PHPqOnWqQnv2hljuHKTBSdrcEjzI8scE8elD6AC3Ba2v5IbZ84PhP8ACmGw7TX+mWbQzJ3kZ91qWtOjb9OxpOvVvEvWnPtOLaLSSwCqTgCnAgz/AIc6hJqJuGkOCG5Wj3aOW2t442n9/wAqQv8ADPVUs7i4R+A+MGrfb/WY7kxxQSZCA5Hxp51gJBe4xWN1b3L4Rl5Gfsq089pJGwZ0U9CGrHtO1a4gIVZGXmjAWbUQrvIzbeaXxeo3kV6CutabYXl+VtMHYniKe7SrNaKl28XpRCS9awYoOnSgGo3pkm3DqaR3KRSNRiXfYEryhntMtdTYMGaKwVs1NbxTMcpV237loufe86+7WdYg+73fKi2IkUpZJPceoCKmumV5dy+de28e7OaK4B9LGmIwuVJ6cVq3Zy9srpTCyFZlXO1+hrKrViLpVTyp10FQZmafhgBsFI3TGQwdpNEt5keWGMhsZ8NA9F119NZrebDIp+opoiu1nlWLxeIY55oR2k0IMO+h2rJ1PxFI97G4GbXUTqEYK+4asabE4uWJ6DpSp2bviiiFlXAOPrTzpgOzcOTRhtiy0Wrri3O7rg+eKQbMWceoT3pKM+dxklBOFB/ZGMeh8z58UwdsL82dgIc7TOdv086TdM7MXGsXHt+pyNHC5/V2/Xavl8uKaTQYxYWTtvE8q2VlCFi3YLEBGlP2cfI8+uKadJlhu2jEbNHMxOARjkdR6fhSRL2Uisrj2i0nkEinIVwpVvh0olqepizs4Lu2TYXBQhuRHKvOCc8KQcg+XNKpKyjg0hw1ns5b6rpzSdwVlGQ4jHvjo33eXn6dMZjeWEmkxFUme5ttu0RSA5i5/Y546DA88eeDt03sz2pt9Ssw24LPGoZlY8kcdflxzQjtdZLIz3EUTm3m4ZE4MTnoR5YOPtGPTFWlRBdMckc22qb1IKgAgjzHrVnWdRa7WNSzYBqaa2gGxpI1OScP+ywyc/IjPr9PUHMcSuq8gHj5UOjcQ5dhVVw9U+1Q2XbVU7N6qLDdngY5FQa1em/mL/s0je6H8a+goPiUkUy6VeCG32tzxnNAYlXFfZfbwvSmUvhnC9l6/nW4kJoTJHmTFTBqiY/rOKX6Gkke9xXV9eKuojaIFJ3HZVuJNyEt1xVPO1jUqu5UiqHOfDplyKv6TbGV9q9c8VVW3lxvpi7F25ln3O2McYpZN0FdIrOP9G3zPcpn0NHorm3vZkFsp345xRi50m1vh3B/3KVo9Pm7PagSXBiclUb0qfRh50G2MYVpMfXrRLtFaSS6dIsH+7jKVR0rUYXRMMpG3xGmBZFlt843JislqjMx6yluIrwLMuCJME/WtJs9RSG0G9v2RQrUdFhe7Z1XBJyDVbULZYNOe4vJ9rgBYY0xl29TSp0w1ZR17UP0v2ssLUDMQ6j7ae4YwIgAu1QBj6Vk3Z65a57ahixUqH5HlhaZrvtLHHIJ45NRa3WQxl2ZApI6+HhsfHFFvdlYrVDZcw7oicZpWvfZGufYb6aMQXR2Fc5KN+y4HUEH6YJFGL/VEOnQTBgy3DbVx8eR+NLGpRXVnazSaXawFicOjxks48+f6/1nlci2KwoX7Ka77PayYpGA7ubcrkZB6g5+BGQR862OExXumqWOLadOMnIQnHBPz+2sY1m+aecrcwszFRvViQeVGTnyOc+oPTyFaN2G1EyaQtuZCylPDkckHPXBPPBH29KtZzOOhF7X2kljc3KNGFDEh1Pk/AyPXjz/AL0oS+EAVqH+JtqkqR3JEgWVS4yclGUHcCPlz6ZHx5zKUDK4bcuOOMVRIkzoelWGTwV8wDippD+r+lTfS0VSIoI+TXrx818wPlsVK1ZhR4i1C/Ev1qdVqCdfFWRnok315UNdTUTs62w03i9aIzQBkUxdari0lUbtrUW0m0lnG0dazYiQMMrLCUZOan0zUZtPcmLlT1HoaN2+g99M3fLjFDtbtILCVYkZSp8vjSqSb0GgjZarcxlbtJN/XK+tDdR12fU5u77vbhqrxSkWrBeMjpXaHbhr/D+ZzRpG6XI5brvFRX28082naW3tbCPvZ2BUbSvqaVNcg7ooIhgvyD9aD3SXAVS8vQ0OjGi2OsR6nqCwIS4Kl25xwPI/UivnWJdPWYNcj2q8A8EKjPd/Ty+f9qB/4cxiW6urljzFEse3/wDZP/r99H9YWdH2abHC9zs3yO/AGTjn18/sqU9M6fErQv8AZ3ULm87U20NzbezwIshiQKcklTznHpTxc2kLFS+3bnz65rMdWur7RtSgu5dYhunhcF4FADEZ8QAHlj1p5bUJJIY7+1Q3UPdh0RGw3rn48VpNpIaO2yftHAPYodqZCMCB86n09bee0EgXn3drdcjivue3a5tu+BtNqjIZpAccZ9OtBLe4uf0klvBLA8H/ABHUMQPgM/nipytMpCmqFnthbLDqqzBffABHoQePxop2Kne0iWKZwncytEpfGGDcgfaM1R7bTW4ZcjPeNtH8/wAKu9mllubXbI2S8eBjHDJjjB8j4CPTOfM5rH8kppKYd7Yo0mk7O7WR1kcbCPewOQMefBIFZI4iZ9qh48dQW3YOfp99axqbfpDsw8km7vFG8t0KsAyZx69Mj548qyUmRrklveYkn5+dVjw5ZfotLEoUfrF+pIrpl8PvL/3V4qtXOvhPypfpX4V4/A9Sl6ijTx1OUosCOR8VBcNubNWo1Wq9yvirRBIi3V1eV1UIj7qawRR421Bp93b2iKxXg56VBcytMdo9+qBsbk+A8AnpU60E1Ls9cWd5pCzI0bkj9YT5HzzWT9pNk+tyRwY7sSHbjpiiMWmX8VswiWVUbg4yMivbDszc3Mu4Kc553UbQcQHcRd2iirujnGpRH18NNsPYwswMrZOOlSJ2NeK7SQOVVSGGPhSuVoKSRQ1aHxxzbfdbFBNWWa6aK0tYi8rsAqoviYnoK1SLSbf2c95t2AZLMeB9atWek2Nm/tiRo8rDKH0HwpooEpfDPNJaHsjqn6OvhILmZF76U8Rg87VX94eI+L4YxR7tJd9xoF9dWbgSMmQ/n6D8/E0U17SrLXFWC8iDgZPeg7Wj+IPl5fkGlbXLJ7XRbixS8EkXdnaZUw6j5jr5+XlUprZ0eKeqMwmTa+c5YtnkcmmXsR2qGkSCyvmPsZbwuD/tk+v/AC/zpfnG9gAeg3Z9eOtG+zPY+511xKJBDb5A3dWJ+Aq7SapnOpSjKzWRBDLEHjwyuBtIwQaVe0OowaLjBxI4IVR1+dFbDQrfQNPWKTUbuVQPBF3vnjoABx5fbSN242rdRe6CQTtByQPLJ8+p5qD8ftR1f7+ou6lfz6heGeQ7jnhfSnzsbcLNdtZBv1isJoZOmUI6fYR9nwFZ1jKk+ho7pF3NZy2t1GP9RaABlJxui3eFvkMkE+Xh+NWlH1OeMvazWeyy+1Xmo6Tdx5Vs71Y8lSCM/ep+f3ZZ2l0abQ9elsbgqWjCkFSSCCoI6itb0mSGTUrfXLd1ERtfGrH/AJhuH0BJ+eKWv8Y7Vf03ZXSJxJbbS3xU/wBRWjWIs7yM8zxXm7PFSAZ4r0w549aGg7KoHdsT618SPV9rTgV4bTAzW0b2KEcrKQK+pW3VfFmrqMda6XSZVAZV4NbJGxkCcV1E/wBFy/u17WzRsJD6tjAr4jTJ8zR7TdHt3ZWZeRzVay09jgN1Bpi0+zaNc7ulLFWBliCyg2Bdq19m0hToq5qTdsFUZbvY5zVKQtsndUUEUu672t0zSv1RlWe6H/CQ9D8W6CruoaiVt3aMAuFJw/QjH41ll/o+nTxfq4JbeQMN7icv9oI4+3rWtGpjH2Xvb/tZrBu7yV/0daPnuwdqO2OFA9Mdf6073V8FHiKnk5A/P559Kz/SNUXSNFWGyYCJCfE/LOT1b8/Cq79orhH9owJHHKg9B06jz8vyaDkFRHu4crBhSVaTlvgPT8fqfiKz/tnqcAVbW3bdJKcMeMDp+ORVHVO0moXTOe97vy/VjHnn+A+wUqmR5boM5LMTks1BRsbKi/pxhW82zDPeRsBv9cf0rQewk4ttNaAHxBiy48vX8B9tZoDi9tMAk71bAHXxf1rT9Lhh060hsiQ1y8eZSFPh46fLy+JzWegrZdeRbqdribcET3M+XH44+4Csz7VXRutVmfduAOB8vyDWg61OLGyYq2CEwBwOmPz9KyydmeR5G6vzQjthlpURIdpB9OaMQKC6vbMVc7SEIBKg8HaPNeuV569OpI22gaWKTbhigHHnjzPy6UasTHNBpspUt3MzROvw8LAD5kvTyYkUPXZ3/SIdHvnYR3ABifBXu3PBUemWBx152881J/iTpt77Lp8mTPbWiFTIox73IYjPTjHwx8s29C9g1rSTZ3WEmQKC6nDDG3B+eSPqKObZLzRrrTb6Pff23hbaxHeLnOR9OfmB6UiQ8nZjaBMeLrj+J/nXwpPejb60T1nTfYbh2Vt0TeJG8mB6Y46/Dy++h9uu+UfOhWjXZfEA7ve1VpGVzsHWmG10yV7cMy+EihN1AYrggLypqaY9EcX+nh3M3OatWeoJKdrdaiS1llG31592p7O2FpdKzr05rNaMpbon7xv3GrqKe3Q/uN/211RyZakOJga3fca+bjVfZ0wKt3NzFzmhV7Al5jYy8V1t1w4qs6PWd2d3WomuXnYsvShV3ZvEjDfXun3sdrCVl5PrU5ydFYQV7LElyrFopOhGDSZqbJbysJPdJAOfXPP4/dVjWNWMlwxt+u7Ar57VQiPO/GS6h8j9rjP30PHbWxp0noGzXkKrhWXnr0/PWqb3akOGlBXB4XBq4qDjwru8sADyr5eLHIdQT1G0fwqggIupRIziJGYA8eE0PC7Xd25IGMemaL3suxMlvLP3UJjXMYY9ZHJ6eVUjwmxk7FaYl1qj306lrewjGD6yeX2cn7Ke7XKq106Yct4c46c8ffVHSbFbHTrXT07pLhsS3I5JZ8DI/AfZV+7mMETBFUrg+LOefWpzZWERV7bXveL3UbZBHO3ofzzSXLzIfkF/P3UV1i6N7fsxxjPVfPy/AZoX/wAJXPV2z9PzijDQJlzT42MbMhKsF3Ag4IP5NENOtpng3A4VZSw3DOcgDn8+ZqpYklXjjOHZQoPoPOm3TbdTaKuUwv7PwFZmQS7LvHH7Vdy4iAijE23ndhuuPiCAfj86ezOs1uL2I95Lb7opNvO9M9fjxgjr6edZxYHf7TbRKX7yFxtOBuPTH2ZNMHZu7nFsLuB90hiOY8k7nU7TkeuNv3/OgmZqwv2i0SHUNJaS2dGVeVLDJJOD4vXI6nzHPlzn9rozrMGdV979nIrQbCeObSZLiKMIixMssGeEK87fkD9zH0pQ7UakNNvgsbhpR4ZkC+646np59fqaE8nw0MU9hOG+hi/0zr6CqF5c2a3WDtoNbTyancBVXEklWZ9I9gzNcS8nnNcy6dMvzYRh1K0EwVU4FFpJ9NS2Msvdnwk5PWkXvmkmIgTgftV8XUN1MViD5JPT0p8d0TT1Yf8A03p37ldS5+gL/wDeSvK2ETZSH+/gneM4fyqGzkms0Jdt3zqrrnaIREwRdVNLraye83O2fhT0ycXEOatqjy+FaWby9kCMCzAHyqW612PbwvNALu5e6kJVeKeMRXIK6ZcJ34aXyIIop2zlLCR8c7uV9fzilKMMCD6U09oh31m8u7dld4J6EEZFPVGTsoQbpFzhV+2obmVrXJbaN3UH8aKQxJHHvO3A593060F7RN3kYfyXhs9OlDXDOwLe3pmOxFA5xkedHeylis+qrLIAbezi3sGHBY+6PxP/AE0vQxZDTHoBxWg6TafozT44pjl5s3Egxz5BV6emPtNPJ0hYq2MOmg7XkYeI+EswAP1+WftoP2pvBDYsIxh2ymemfpVi41KK3gZQQAwzzwM9c0IN8l3a3l3JsHcRmOAc5LHPOPgP41zt2zqjGhSdSqSMfPci/TA/iTXxMrb4Y/TA+2vpVla2QAblXlT8fzzUykd9Ercngg/EeVWIUfenS/rZh6nr9c036ZswQfXHPJ4/vSjDaSw7ZNvU4+wU16VLlUJ5PQH+H59Kxie4gEKu3iVmXYFPxGOv1+6h9hqclrv2thtwYDd8vP5j8KMXsMdxGN23I68daF29pFNepHOTHDK4jkZVztDHr8ef40ANmiW95bXOhvq9urNNHGFvFj6sRjL49QM5P1pB7W51BdL1eRADeWwEp9XXA/DFOWgaTP2c1tWy8tld+HvEGArA8qfrn6Ut9p7A2thq+mk7V025jmgB6dy5Ix/5qf8AppqF6wVYd3pw9qDbzj5YoVq2sXWqT+LwxjgL5Vf0izhuGBnk3jHQ9Kg1yx7qb/TL4ceVc6UctnQ3Jx0dZSyxw4CZGOTROG6te7EhmxIvRfQ18aQYl0hkcZmZcAetULLsvd3V+Glk2Icluv2U2habCn6Xl+FeVb/yo/8A9k11DKIMZAjUdKZZhtZmY80KuNKmVtx3YpotZ43m/XN58V5qsoDgx9AKTOS0V/zi9izHprSDG3pXzHbbJSgXnzozLfRRqsaryTzV/SbCOWYtL7rDNOm10RpPgqCEvMVCc0fu7cnQI967XEWG+Q/sKPtbadYS722Zx+1QPWNetJN1uinu2BXcPLNFTbYrgkRKuUUNt2j/AJQKAa/MJgIYNvB8WPWr9/dStCi25AWQYZ/KqdnaCWeCFeW7wM3xqn9F6z60WwivtbttNJxEg3S58wOSD88ffTfNBPrNxLDYyLG5yA7jhVXBOB16sPsoJ2LtCmt6zdvKd1uvcpIF6Fj1x8AuPrTBosSNq9uZo23Lbsy7P+GxfPPPmCPurSDD9EkvZ7SJ9Oe3urXbcxodzl8sSB1B/hSi5fSreaxiDPBOAFIGWwR0rQNfO8KijdxzjrUGh6ShL30ygnG2Isvl5t/D6Goxk3KkdEkoePJmZ6XKsJktbwbGQ4wwwfhXsncxSrLFKpjT3R6fnimTtlY2smsOkUSrwpkYL1bH9aUr7SpII3dHbaMkH1xXTSOK2i7bzd5lsLyenpRu2vUs7Z5W4Pp+fpSobK4tpDHE25iA1dNLdewypMrFd3vfumg4hUh1sdS9oZSMYYHnbkfnpX1fW5xuhztHpnr8aG9nO5WxikY4HTOM8/kUXlvYGj7sMzZXHX+FK9DrY9dkdXTXrf2G7LmXuUfd5iRcAkenQH7as9pNHN5pt48i/rms3glZR74UF0P0K/fWc6VcTWF/b3FpJ44SxUHPzwfnWwaTf22t6WlzFhlkG10/db0qkWmiM04uzCdNS5e4hWGB+6LZZyvhxTRrDWsVjjw97ioNXv5NNhltbSFQ0TsufTBxS40rK4muDvdznFcdM7Ml8DOhaBczym/nfu4QchT51c1HW4YW2xZLR8ZWp/8AMcUWkMpXaQmPupLt7uN4i03uh8/fSJNtso6SQZ/TUnrJ/wBxrqn/AEjpXwrqW2PigVEQ8fhOD5GrUVlJKojeTrQqNJE8LdRU8FwwkCscEGumUDkUkGn0i3tYhJI3PlVOS7ltz+rZsDpVS91BpHWMyZAqW1aFV3OjfJqyVBuyvdXD3pxK5/6qrR6cXY7Duq1cQyzsxhXweVe2k7W8JbGWHlRAwppXZ9O733MvHkq1ZtbS07+WeAY7siMsPMnnj7vtqpawXWqW5y7Y8lXijMNmum6Xa2z/AO6SZZcdeen3fhQsZLaA/Z5Vg03Vbtdhnur+QRqR1CA8faT91Sm7uLW9W5gGZYwqOp53rgDn7KtWEZ/y9pbACLv45Lh1QgHc53Bgfu+vwqlep3k8xUjmRiFA5wWPU/YKaYPH1jDazwa5Oe44Zz416FfXimJ1VECoMRxgBRjoPT84+tCuyOnC1sfbJF/XXI4Pog5+/wDlV7W5xBp00n7QXavzY4FGEElYnlnk6M8vnW51O4mHvPISB+6KqXkO+MIBnceB935+VWo4CIwc7nPvD97P5NcY2luI0TYRDiRwze8M/wB6axaKlzFm8uD3Xnt8vL+9UtTiVdNbnbvkxg5Hp/OrJuhAze0RGEly2XXw9fXpUOuyI1tGkZ3bVMvH3fiPsrWagdpmom1t2huYZDbmTKd0ckfn+NFo+7mhM9neyRDzMgUqT8eeKrSW6/opLuJWYRbW2+tMOnG2lsY5IEQQynIIHXj85+NNoGwL+kLqwZVu4F7rcSJo8EMCOOfpTx/h92hittS9mMubW7OCBxh/Ij0z/KlxtLgtpe8714oGJMsG0Mvx4zx9D9K+9f0i10+ztu0OiLssZGVJbXOTbSc4JI8jgfI+fIrLtgfKCfb60a37T3Sl8RSOsjD4EDJ/GlHU7mzSRUtmz8fLNMPbnUn1OLRtRgTa93atHKPR42wT/wCQ+6qXZ3skL1GnuG6moSSuzog3jSFyRpJZlj3fqzR3QezU+oXGVQC1HJLedPNj2LtLNfamO9wMgbRivNI1u3hluITH3QQkY45oOQf6Vf8AKdp/8Mf3V1Wv8wWn/wA1dSByEGyAmO9huzV9dLWc7gvNSxXFoIl7rqOKmsr6VpgtrbM5z1Ck085MEIopXHZ6dcThOKkitJrwKlvBls4Jp2tbK7vBGssaonVgOtGrfR4rIiRE8ufDWhcgSSiKVj2XdIF9qdgDyQegFEbTszp0ZIxu3VH2t7SW2nILfrIfL0rPk7UX8NySk0g3ZIBBIFFxb4KmktmpNp9nYfrVCoqryB0x60oa3eAafNqEgK4gLbPMbuQPvFU11q9vdKn9qbDyYiQnzLcdPlmq/by4ENlBYpy00iqx+C/1xWjH4M5asMT2QgjsIlwzQW8SAs3mFXy+OT9lUZhvmYo20s3n0AzkeVFryRRq8YXx7GG0u2dvHXH0/GgiSAo53eEOCc+X5zTeTtA8PGwzp3aqaz9mtruIzQPGSJBwyKqk49DwMVNrer2l9pssdncCQpIFkXoyEdMjypV1E7JoFLLiG3kkG3jqu31+P311rAmLouOZbt29OBgfiDQjPdAlDVksTboyOm7j5Y/vVBZGWa5uejRoEQnplif/AFFWu5WNcDfnILncfuz86o3GYrOHglpZiwB6nH9jTLaFemXYrmSRv1oRnbIG9fM/3oLq5hdbhkhERRtrBR15z1/PnRWAzRpAs2HTcQyjPhPLY+uPupYe5d57ldoKyOchm6YNZLZmxp01VlsO4IBDRgBfL8/zruzsbx6fPZyDgZK5zgGo9KMyLDIjqu0j3eRx8aLSI7so3eDByOnT8aLdAxsryTssSq7MwwCuec58yfz61b0HUZ7KZkGyW1fia3fxCQcZ4+yqlx4hzjw8Hco+XlXxbs7NtU7fl0qTkyqiqGjtNpFh/lixn0mCaKATuyRv4iu7GfXjw/dVKyilgjzHcNnAz8PpU9/r8k3ZW9NiFlS2nit1bywVbcw/6jj5Ur6fq9zAWim8+DW8kW3YPHJJUaDeM9pZwzJftKrY3RlgQR8KVddjtP1kz3BRnHujzoUrz3ZdbdyFznhsjNDbSWNdQePUGDEHgtWoOzzZD+9LXlGfa7D1T/trq1moudmuzvfMsspyD15rQNLs7SyTAWva6qNEkzzUNWhsnUqMjP7tCtZ7ZQ3NsIbEMszcElcba6upMnQ+KsSrtIppzNP4pD14qg2pWS3O1oAxXjpXV1BBYVaUXV5pMUEYRZJ+9b5KOfr1+2gPba5369ZIScRjIyMjlx/KurqpHosuMdZGWa8uHBXdC5HiByOMdaByKRbPgDLZyB+fhXV1L5eobxcKWqPtkuk8ktTnI5yWT+VWWk2ADzYF/oxLfxFdXUv0aX5PEYlS78qR0+yq1/G11BAIDgxZB3fHNdXU6JkCQ3BTvpdu1UY4DHp/Y0CltWh2OTyeT8811dTxEkELC9aFl4zyOKPQTLdQsuSD0UeldXUJGgU5rk2qsbiRivQAfn41UnuXvsKuY4hyF/f56n+VeV1TSKsOWDInYzWUHTv4ODnwnJ+PwpPPezznc/vHiurqp8EQwxXJ02yWNTlmHWoLGxOqzq0oUDPWurqiVDH+X9O+P317XV1MKf/Z",
    color: "#3d52c4",
  },
  {
    name: "Shubham Sakaya",
    role: "HOD - Marketing, Sales & HR",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj11gIy5gJSVvO81U2DXFM3GBDbPYprWZdP6ZoPCXMmAwyTHnX_ILBpOs&s",
    color: "#3d52c4",
  },
  {
    name: "Prakash Soni",
    role: "CEO & Founder",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReGfN1P9xNfIHm-599EKp49kqQlJ3HHthHiQvnzsLi9SlK-8Ak9oOizfE&s",
    color: "#e8352a",
  },
  {
    name: "Riya Shrestha",
    role: "Senior Counsellor",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcYE4KFNtvuB3iebPY1NaLVcyhw0awqebtyh7kwB0pDQ&s",
    color: "#1a9e5c",
  },
  
];

const whyChooseUs = [
  {
    color: "#e8352a",
    title: "Easy Processing",
    desc: "From complex cases to handling every hassle. Raffles will make your processing easy.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    color: "#1a90c8",
    title: "5000+ Visa Success",
    desc: "Wide student network and the expertise gained is something we are proud of.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    color: "#1a9e5c",
    title: "End-to-End Support",
    desc: "From application to arrival, we handle the details so you can focus on your dreams.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

function AvatarPlaceholder({ name, color }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: "100%", height: "100%",
      background: `linear-gradient(135deg, ${color}22, ${color}44)`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        background: color + "33",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "2rem", fontWeight: 700, color: color,
        fontFamily: "Plus Jakarta Sans, sans-serif",
      }}>
        {initials}
      </div>
    </div>
  );
}

export default function TeamSection() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imgErrors, setImgErrors] = useState({});
  const timerRef = useRef(null);

  const total = teamMembers.length;
  // show 3 visible: prev, center, next (on desktop)
  const getVisible = (idx) => {
    const prev = (idx - 1 + total) % total;
    const next = (idx + 1) % total;
    return [prev, idx, next];
  };

  const [prev, center, next] = getVisible(current);

  const goNext = () => setCurrent((c) => (c + 1) % total);
  const goPrev = () => setCurrent((c) => (c - 1 + total) % total);

  // Auto-slide every 3.5s, pause on hover
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(goNext, 3500);
    }
    return () => clearInterval(timerRef.current);
  }, [isHovered, current]);

  const handleImgError = (slug) => {
    setImgErrors((e) => ({ ...e, [slug]: true }));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .tm-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #fff;
          overflow: hidden;
        }

        /* ── TEAM SECTION ── */
        .tm-section { padding: 72px 0 60px; }
        .tm-heading {
          text-align: center;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 800;
          color: #111;
          letter-spacing: -0.02em;
          margin-bottom: 48px;
        }

        /* SLIDER */
        .tm-slider-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 0 60px;
          user-select: none;
        }

        .tm-cards-track {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          width: 100%;
          max-width: 1100px;
        }

        /* CARD */
        .tm-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          flex-shrink: 0;
          transition: all 0.45s cubic-bezier(0.34, 1.3, 0.64, 1);
          cursor: pointer;
        }
        .tm-card.center {
          width: 320px; height: 400px;
          z-index: 3;
          box-shadow: 0 20px 60px rgba(0,0,0,0.16);
          transform: scale(1.05);
        }
        .tm-card.side {
          width: 260px; height: 340px;
          z-index: 2;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          opacity: 0.82;
          transform: scale(0.96);
        }

        .tm-card-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top;
          display: block;
          transition: transform 0.5s ease;
        }
        .tm-card:hover .tm-card-img { transform: scale(1.04); }

        .tm-card-label {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 16px 20px 18px;
          background: linear-gradient(to top, rgba(61,82,196,0.95) 0%, rgba(61,82,196,0.7) 100%);
          backdrop-filter: blur(4px);
          color: #fff;
        }
        .tm-card-label.red-label  { background: linear-gradient(to top, rgba(232,53,42,0.92), rgba(232,53,42,0.6)); }
        .tm-card-label.green-label{ background: linear-gradient(to top, rgba(26,158,92,0.92), rgba(26,158,92,0.6)); }
        .tm-card-label.orange-label{ background: linear-gradient(to top, rgba(232,146,42,0.92), rgba(232,146,42,0.6)); }
        .tm-card-name {
          font-size: 1rem; font-weight: 700; color: #fff;
          margin-bottom: 3px; letter-spacing: 0.01em;
        }
        .tm-card-role { font-size: 0.78rem; color: rgba(255,255,255,0.82); font-weight: 400; }

        /* NAV BUTTONS */
        .tm-nav-btn {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          z-index: 10;
          width: 44px; height: 44px;
          border-radius: 50%;
          background: #fff;
          border: 1.5px solid #e8e8e8;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          transition: background 0.18s, border-color 0.18s, transform 0.18s;
          color: #555;
        }
        .tm-nav-btn:hover {
          background: #3d52c4; border-color: #3d52c4; color: #fff;
          transform: translateY(-50%) scale(1.08);
        }
        .tm-nav-btn.prev { left: 12px; }
        .tm-nav-btn.next { right: 12px; }

        /* DOTS */
        .tm-dots {
          display: flex; justify-content: center; gap: 8px;
          margin-top: 36px;
        }
        .tm-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #e0e0e0; cursor: pointer;
          transition: background 0.2s, width 0.25s, border-radius 0.25s;
          border: none; outline: none; padding: 0;
        }
        .tm-dot.active {
          background: #3d52c4;
          width: 24px; border-radius: 4px;
        }

        /* DIVIDER */
        .tm-divider {
          display: flex; justify-content: center; margin: 8px 0;
        }
        .tm-divider-bar {
          width: 48px; height: 3px;
          background: #e8352a; border-radius: 2px;
        }

        /* WHY CHOOSE US */
        .tm-why { padding: 60px 48px 72px; }
        .tm-why-inner { max-width: 1080px; margin: 0 auto; }
        .tm-why-heading {
          text-align: center;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          font-weight: 800;
          color: #3d52c4;
          letter-spacing: -0.02em;
          margin-bottom: 40px;
        }
        .tm-why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .tm-why-card {
          background: #f7f8fa;
          border: 1px solid #ebebeb;
          border-radius: 16px;
          padding: 36px 28px;
          text-align: center;
          transition: box-shadow 0.22s, transform 0.22s;
          position: relative;
          overflow: hidden;
        }
        .tm-why-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 16px 16px 0 0;
        }
        .tm-why-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.09);
          transform: translateY(-4px);
        }
        .tm-why-icon {
          width: 56px; height: 56px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 18px;
        }
        .tm-why-title {
          font-size: 1.1rem; font-weight: 800;
          margin-bottom: 10px; letter-spacing: -0.01em;
        }
        .tm-why-desc {
          font-size: 0.855rem; color: #888;
          line-height: 1.75; font-weight: 400;
        }

        @media (max-width: 820px) {
          .tm-slider-wrap { padding: 0 40px; }
          .tm-card.side { display: none; }
          .tm-card.center { width: 80vw; max-width: 320px; height: 360px; }
          .tm-why { padding: 48px 20px 60px; }
          .tm-why-grid { grid-template-columns: 1fr; gap: 14px; }
          .tm-section { padding: 56px 0 48px; }
        }
      `}</style>

      <div className="tm-root">

        {/* ── TEAM SECTION ── */}
        <section className="tm-section">
          <h2 className="tm-heading">Our Expert Team</h2>

          <div
            className="tm-slider-wrap"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* PREV BTN */}
            <button className="tm-nav-btn prev" onClick={goPrev} aria-label="Previous">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="tm-cards-track">
              {/* PREV CARD */}
              <div className="tm-card side" onClick={goPrev}>
                {!imgErrors[prev] ? (
                  <img
                    src={teamMembers[prev].image}
                    alt={teamMembers[prev].name}
                    className="tm-card-img"
                    onError={() => handleImgError(prev)}
                  />
                ) : (
                  <AvatarPlaceholder name={teamMembers[prev].name} color={teamMembers[prev].color} />
                )}
                <div className={`tm-card-label${teamMembers[prev].color === "#e8352a" ? " red-label" : teamMembers[prev].color === "#1a9e5c" ? " green-label" : teamMembers[prev].color === "#e8922a" ? " orange-label" : ""}`}>
                  <div className="tm-card-name">{teamMembers[prev].name}</div>
                  <div className="tm-card-role">{teamMembers[prev].role}</div>
                </div>
              </div>

              {/* CENTER CARD */}
              <div className="tm-card center">
                {!imgErrors[center] ? (
                  <img
                    src={teamMembers[center].image}
                    alt={teamMembers[center].name}
                    className="tm-card-img"
                    onError={() => handleImgError(center)}
                  />
                ) : (
                  <AvatarPlaceholder name={teamMembers[center].name} color={teamMembers[center].color} />
                )}
                <div className={`tm-card-label${teamMembers[center].color === "#e8352a" ? " red-label" : teamMembers[center].color === "#1a9e5c" ? " green-label" : teamMembers[center].color === "#e8922a" ? " orange-label" : ""}`}>
                  <div className="tm-card-name">{teamMembers[center].name}</div>
                  <div className="tm-card-role">{teamMembers[center].role}</div>
                </div>
              </div>

              {/* NEXT CARD */}
              <div className="tm-card side" onClick={goNext}>
                {!imgErrors[next] ? (
                  <img
                    src={teamMembers[next].image}
                    alt={teamMembers[next].name}
                    className="tm-card-img"
                    onError={() => handleImgError(next)}
                  />
                ) : (
                  <AvatarPlaceholder name={teamMembers[next].name} color={teamMembers[next].color} />
                )}
                <div className={`tm-card-label${teamMembers[next].color === "#e8352a" ? " red-label" : teamMembers[next].color === "#1a9e5c" ? " green-label" : teamMembers[next].color === "#e8922a" ? " orange-label" : ""}`}>
                  <div className="tm-card-name">{teamMembers[next].name}</div>
                  <div className="tm-card-role">{teamMembers[next].role}</div>
                </div>
              </div>
            </div>

            {/* NEXT BTN */}
            <button className="tm-nav-btn next" onClick={goNext} aria-label="Next">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* DOTS */}
          <div className="tm-dots">
            {teamMembers.map((_, i) => (
              <button
                key={i}
                className={`tm-dot${i === current ? " active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* DIVIDER */}
        <div className="tm-divider"><div className="tm-divider-bar" /></div>

        {/* ── WHY CHOOSE US ── */}
        <section className="tm-why">
          <div className="tm-why-inner">
            <h2 className="tm-why-heading">Why Choose Us</h2>
            <div className="tm-why-grid">
              {whyChooseUs.map((item, i) => (
                <div className="tm-why-card" key={i}
                  style={{ "--card-color": item.color }}
                >
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                    background: item.color, borderRadius: "16px 16px 0 0",
                  }} />
                  <div className="tm-why-icon" style={{ background: item.color + "15", color: item.color }}>
                    {item.icon}
                  </div>
                  <div className="tm-why-title" style={{ color: item.color }}>{item.title}</div>
                  <p className="tm-why-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <div className="tm-divider"><div className="tm-divider-bar" /></div>

      </div>
    </>
  );
}