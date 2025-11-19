import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({ errorInfo });

        // Here you could send error to logging service (e.g., Sentry)
        // Sentry.captureException(error, { extra: errorInfo });
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-black flex items-center justify-center p-4">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-2xl w-full">
                        <div className="flex items-center mb-6">
                            <svg
                                className="h-12 w-12 text-red-500 mr-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            <h1 className="text-3xl font-bold text-red-500">
                                Что-то пошло не так
                            </h1>
                        </div>

                        <p className="text-gray-300 mb-6">
                            Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить страницу.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mb-6">
                                <summary className="cursor-pointer text-amber-400 hover:text-amber-300 mb-2">
                                    Подробности ошибки (только в режиме разработки)
                                </summary>
                                <div className="bg-gray-900 p-4 rounded text-sm">
                                    <p className="text-red-400 font-mono mb-2">
                                        {this.state.error.toString()}
                                    </p>
                                    {this.state.errorInfo && (
                                        <pre className="text-gray-400 overflow-auto max-h-60">
                                            {this.state.errorInfo.componentStack}
                                        </pre>
                                    )}
                                </div>
                            </details>
                        )}

                        <div className="flex gap-4">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 px-6 py-3 bg-amber-500 text-black font-bold rounded hover:bg-orange-500 transition duration-300"
                            >
                                Обновить страницу
                            </button>
                            <button
                                onClick={this.handleReset}
                                className="flex-1 px-6 py-3 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-500 transition duration-300"
                            >
                                Попробовать снова
                            </button>
                        </div>

                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full mt-4 px-6 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition duration-300"
                        >
                            Вернуться на главную
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;

