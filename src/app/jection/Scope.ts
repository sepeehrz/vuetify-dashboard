export type ScopeClass = new (...args: any) => any;

interface ScopeRegister {
  name: string;
  ctor: ScopeClass;
  dependencies?: string[];
  designPatern: 'factory' | 'singleton';
}

interface ScopeInstance {
  name: string;
  instance: InstanceType<ScopeClass>;
}

export class Scope {
  private readonly registers: ScopeRegister[] = [];
  private readonly instances: ScopeInstance[] = [];

  private register<T extends ScopeClass>(
    designPatern: ScopeRegister['designPatern'],
    ctor: T,
    dependencies?: ScopeClass[] | string[]
  ) {
    if (this.registers.some(item => item.name === ctor.name)) {
      throw new Error(`${ctor.name} before registered!`);
    }
    this.registers.push({
      name: ctor.name,
      ctor,
      dependencies: dependencies?.map(f =>
        typeof f === 'function' ? f.name : f
      ),
      designPatern
    });
  }

  single<T extends ScopeClass>(
    ctor: T,
    dependencies?: ScopeClass[] | string[]
  ) {
    this.register('singleton', ctor, dependencies);
  }

  factory<T extends ScopeClass>(
    ctor: T,
    dependencies?: ScopeClass[] | string[]
  ) {
    this.register('factory', ctor, dependencies);
  }

  private getRegistryByName(name: string) {
    const findRegister = this.registers.find(item => item.name === name);
    if (!findRegister) {
      throw new Error(`${name} not register in scope`);
    }
    return findRegister;
  }

  get<T extends ScopeClass>(ctor: T): InstanceType<T> {
    const register = this.getRegistryByName(ctor.name);
    const findInstance = this.instances.find(item => item.name === ctor.name);
    if (findInstance && register.designPatern === 'singleton') {
      return findInstance.instance;
    }
    const dependencies: InstanceType<ScopeClass>[] = [];
    register.dependencies?.forEach(item => {
      const dRegister = this.getRegistryByName(item);
      dependencies.push(this.get(dRegister.ctor));
    });
    const instance = new register.ctor(...dependencies);
    this.instances.push({
      name: ctor.name,
      instance
    });
    return instance;
  }
}
