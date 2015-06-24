Does anyone know of predefined conditional compilation directives for
C\#? I know VS.NET creates “DEBUG” and “TRACE”, but I was wondering if
there’s a built-in version conditional? I want to write something like:

```csharp
#if CLRv1.1
  //...CLR v1.1 specific code...
#else
  //...CLR v1.0 specific code...
#endif
```