import Suborbital

class Hello: Suborbital.Runnable {
    func run(input: String) -> String {

        Suborbital.LogInfo(msg: "🌍 Calling AssemblyScript ... 😄")

        let callAssemblyScript = Suborbital.HttpGet(url: "http://localhost:8088")

        Suborbital.LogInfo(msg: "🌍 Calling JavaScript ... 😍")

        let callJavaScript = Suborbital.HttpGet(url: "http://localhost:8089")

        return callAssemblyScript + " " + callJavaScript

    }
}

Suborbital.Set(runnable: Hello())
