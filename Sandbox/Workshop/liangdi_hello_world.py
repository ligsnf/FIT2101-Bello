def fibonacci(n: int) -> int:
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n-2) + fibonacci(n-1)
    # elif n % 2 == 0:
    #     return fibonacci(n/2) * (2 * fibonacci(n/2 + 1) - fibonacci(n/2))
    # else:
    #     return fibonacci((n-1)/2 + 1)**2 + fibonacci((n-1)/2)**2

def fibonacci_short(n: int) -> int:
    if n % 2 == 0:
        return fibonacci(n/2) * (2 * fibonacci(n/2 + 1) - fibonacci(n/2))
    else:
        return fibonacci((n-1)/2 + 1)**2 + fibonacci((n-1)/2)**2

for i in range(10):
    print(f"{fibonacci_short(i)}")