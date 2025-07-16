<?php

namespace Drupal\program_finder\EventSubscriber;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Modifies existing routes for Program Finder.
 */
class ProgramFinderRouteSubscriber extends RouteSubscriberBase implements EventSubscriberInterface {

  /**
   * The config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * Constructs the route subscriber.
   */
  public function __construct(ConfigFactoryInterface $config_factory) {
    $this->configFactory = $config_factory;
  }

  /**
   * {@inheritdoc}
   */
  protected function alterRoutes(RouteCollection $collection) {
    $config = $this->configFactory->get('program_finder.settings');
    $path = $config->get('finder_path');
    $disabled = $config->get('disable_page');

    // If disabled or path is invalid, skip route creation.
    if (!$disabled || !is_string($path) || empty($path)) {
      // Remove route if previously defined.
      if ($collection->get('program_finder.dynamic')) {
        $collection->remove('program_finder.dynamic');
      }
      return;
    }

    // Add or update the dynamic route.
    $route = new Route(
      $path,
      [
        '_controller' => '\Drupal\program_finder\Controller\ProgramFinderController::content',
        '_title' => 'Find Your Program',
      ],
      [
        '_permission' => 'access content',
      ]
    );

    $collection->add('program_finder.dynamic', $route);
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return parent::getSubscribedEvents();
  }

}
