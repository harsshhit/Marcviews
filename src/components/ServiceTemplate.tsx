import { ServicePage } from "../types";

interface ServiceTemplateProps {
  data: ServicePage;
}

export function ServiceTemplate({ data }: ServiceTemplateProps) {
  return (
    <div className="bg-slate-950">
      {/* Hero Section with Background Image */}
      <div
        className="relative min-h-[80vh] flex items-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${data.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 to-slate-950/90" />
        <div className="max-w-7xl mx-auto px-4 py-20 z-10 w-full">
          <div className="max-w-3xl">
            <h1 className="heading-1 mb-8 animate-fade-in text-white">
              {data.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 max-w-2xl leading-relaxed animate-fade-in-up">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      {/* Features Section with Images */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="heading-2 text-center mb-16 text-white">Our Services</h2>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {data.features.map((feature, index) => (
            <div
              key={index}
              className="card card-hover hover-glow group bg-slate-900"
            >
              <div
                className="h-56 bg-cover bg-center rounded-t-2xl relative overflow-hidden"
                style={{
                  backgroundImage: `url(${feature.image})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-cyan-400 transition-all duration-500">
                  {feature.title}
                </h3>
                <p className="text-slate-200">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section with Icons */}
        <div className="mb-24">
          <h2 className="heading-2 text-center mb-16 text-white">
            Key Benefits
          </h2>

          <div className="bg-surface backdrop-blur-sm bg-opacity-50 rounded-xl p-6 border border-slate-700/50">
            <div className="relative rounded-3xl overflow-hidden glass-effect hover-glow bg-slate-900">
              <div
                className="absolute inset-0 opacity-10 blur-lg"
                style={{
                  backgroundImage: `url(${data.heroImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <div className="relative p-12">
                <div className="grid md:grid-cols-3 gap-8">
                  {data.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="text-center bg-slate-800/70 backdrop-blur-md p-8 rounded-2xl hover-glow hover-float"
                    >
                      {benefit.icon ? (
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                          <img
                            src={benefit.icon}
                            alt={benefit.title}
                            className="w-10 h-10"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                          <span className="text-3xl font-bold text-white">
                            {index + 1}
                          </span>
                        </div>
                      )}
                      <h3 className="text-2xl font-semibold mb-4 text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-200">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call To Action with Background Image */}
        <div
          className="card relative overflow-hidden text-center hover-glow bg-slate-900"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${
              data.callToAction.backgroundImage || data.heroImage
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 to-slate-950/70" />
          <div className="relative p-12 md:p-24">
            <h2 className="heading-2 mb-6 text-white">
              {data.callToAction.title}
            </h2>
            <p className="text-xl text-slate-100 mb-8 max-w-2xl mx-auto">
              {data.callToAction.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
